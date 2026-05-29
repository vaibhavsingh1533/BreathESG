from django.db import models
from organizations.models import Organization


class DataSource(models.Model):

    SOURCE_TYPES = (
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    )

    organization = models.ForeignKey(
        Organization,
        on_delete=models.CASCADE
    )

    source_type = models.CharField(
        max_length=50,
        choices=SOURCE_TYPES
    )

    source_name = models.CharField(max_length=255)

    uploaded_at = models.DateTimeField(auto_now_add=True)


class RawRecord(models.Model):

    STATUS_CHOICES = (
        ('PENDING', 'PENDING'),
        ('PARSED', 'PARSED'),
        ('FAILED', 'FAILED'),
    )

    data_source = models.ForeignKey(
        DataSource,
        on_delete=models.CASCADE
    )

    raw_payload = models.JSONField()

    status = models.CharField(
        max_length=50,
        choices=STATUS_CHOICES,
        default='PENDING'
    )

    parse_errors = models.TextField(
        blank=True,
        null=True
    )

    checksum = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)