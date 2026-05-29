from django.db import models

from organizations.models import Organization
from ingestion.models import RawRecord


class NormalizedEmissionRecord(models.Model):

    REVIEW_STATUS = (
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    )

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    raw_record = models.ForeignKey(
        RawRecord,
        on_delete=models.CASCADE
    )

    scope = models.CharField(max_length=50)

    category = models.CharField(max_length=100)

    activity_date = models.DateField()

    activity_value = models.FloatField()

    original_unit = models.CharField(max_length=50)

    normalized_unit = models.CharField(max_length=50)

    emission_factor = models.FloatField()

    co2e_emission = models.FloatField()

    validation_flags = models.JSONField(default=list)

    review_status = models.CharField(
        max_length=50,
        choices=REVIEW_STATUS,
        default='PENDING'
    )

    locked_for_audit = models.BooleanField(default=False)

    analyst_notes = models.TextField(
    blank=True,
    null=True
)

    created_at = models.DateTimeField(auto_now_add=True)