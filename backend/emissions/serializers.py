
from rest_framework import serializers

from .models import NormalizedEmissionRecord


class NormalizedEmissionRecordSerializer(
    serializers.ModelSerializer
):

    source_type = serializers.SerializerMethodField()

    source_name = serializers.SerializerMethodField()

    checksum = serializers.SerializerMethodField()


    class Meta:

        model = NormalizedEmissionRecord

        fields = '__all__'


    def get_source_type(self, obj):

        return obj.raw_record.data_source.source_type


    def get_source_name(self, obj):

        return obj.raw_record.data_source.source_name


    def get_checksum(self, obj):

        return obj.raw_record.checksum

