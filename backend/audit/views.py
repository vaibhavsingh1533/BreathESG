from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import AuditLog
from .serializers import AuditLogSerializer


@api_view(['GET'])
def audit_logs(request):

    logs = AuditLog.objects.all().order_by('-timestamp')

    serializer = AuditLogSerializer(
        logs,
        many=True
    )

    return Response(serializer.data)