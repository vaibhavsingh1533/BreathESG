
from rest_framework.decorators import api_view
from rest_framework.response import Response

from audit.models import AuditLog

from .models import NormalizedEmissionRecord
from .serializers import NormalizedEmissionRecordSerializer


@api_view(['GET'])
def review_queue(request):

    records = NormalizedEmissionRecord.objects.filter(
        review_status='PENDING'
    )

    serializer = NormalizedEmissionRecordSerializer(
        records,
        many=True
    )

    return Response(serializer.data)


@api_view(['POST'])
def approve_record(request, pk):

    record = NormalizedEmissionRecord.objects.get(id=pk)

    old_status = record.review_status

    record.review_status = 'APPROVED'

    record.locked_for_audit = True

    record.save()

    AuditLog.objects.create(

        record=record,

        action='RECORD_APPROVED',

        old_value={
            'review_status': old_status
        },

        new_value={
            'review_status': 'APPROVED'
        },

        changed_by='ESG Analyst'
    )

    return Response({
        'message': 'Record approved successfully'
    })

@api_view(['POST'])
def add_analyst_note(request, pk):

    record = NormalizedEmissionRecord.objects.get(id=pk)

    note = request.data.get('note')

    record.analyst_notes = note

    record.save()

    AuditLog.objects.create(

        record=record,

        action='ANALYST_NOTE_ADDED',

        old_value={},

        new_value={
            'note': note
        },

        changed_by='ESG Analyst'
    )

    return Response({
        'message': 'Note added successfully'
    })