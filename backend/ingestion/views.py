
import csv
import hashlib

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from organizations.models import Organization

from ingestion.utils import normalize_unit

from emissions.models import NormalizedEmissionRecord
from emissions.validators import validate_record

from .models import DataSource, RawRecord


class SAPUploadView(APIView):

    def post(self, request):

        return process_upload(
            request,
            source_type='SAP'
        )


class UtilityUploadView(APIView):

    def post(self, request):

        return process_upload(
            request,
            source_type='UTILITY'
        )


class TravelUploadView(APIView):

    def post(self, request):

        return process_upload(
            request,
            source_type='TRAVEL'
        )


def process_upload(request, source_type):

    file = request.FILES['file']

    organization = Organization.objects.first()

    if not organization:

        organization = Organization.objects.create(
            name='Demo Enterprise',
            industry='Manufacturing',
            country='India'
        )

    data_source = DataSource.objects.create(
        organization=organization,
        source_type=source_type,
        source_name=file.name
    )

    decoded_file = file.read().decode('utf-8').splitlines()

    reader = csv.DictReader(decoded_file)

    processed_records = 0

    for row in reader:

        checksum = hashlib.md5(
            str(row).encode()
        ).hexdigest()

        raw_record = RawRecord.objects.create(
            data_source=data_source,
            raw_payload=row,
            checksum=checksum,
            status='PARSED'
        )

        # SAP

        if source_type == 'SAP':

            value = float(row['MENGE'])

            unit = row['MEINS']

            category = 'Fuel'

            scope = 'Scope 1'

            emission_factor = 2.31


        # UTILITY

         
        elif source_type == 'UTILITY':

            value = float(
                row.get('KWH', 0)
            )

            unit = 'kWh'

            category = 'Electricity'

            scope = 'Scope 2'

            emission_factor = 0.82




        # TRAVEL

        else:

            value = float(
                row.get('DISTANCE_KM',0)
            )

            unit = 'km'

            category = 'Travel'

            scope = 'Scope 3'

            emission_factor = 0.14


        normalized_value, normalized_unit = normalize_unit(
            value,
            unit
        )

        co2e_emission = normalized_value * emission_factor

        record_data = {

            'activity_value': normalized_value,

            'category': category,

            'unit': normalized_unit,

            'scope': scope
        }

        flags = validate_record(record_data)

        NormalizedEmissionRecord.objects.create(

            organization=organization,

            raw_record=raw_record,

            scope=scope,

            category=category,

            activity_date='2025-03-12',

            activity_value=normalized_value,

            original_unit=unit,

            normalized_unit=normalized_unit,

            emission_factor=emission_factor,

            co2e_emission=co2e_emission,

            validation_flags=flags
        )

        processed_records += 1

    return Response({

        'message': f'{source_type} data uploaded successfully',

        'records_processed': processed_records

    }, status=status.HTTP_201_CREATED)

