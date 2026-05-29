
from django.contrib import admin
from django.urls import path

from audit.views import audit_logs

from ingestion.views import SAPUploadView

from emissions.views import (
    review_queue,
    approve_record,
    add_analyst_note
)

from ingestion.views import (
    SAPUploadView,
    UtilityUploadView,
    TravelUploadView
)



urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        'api/upload/sap/',
        SAPUploadView.as_view()
    ),

    path(
        'api/review/',
        review_queue
    ),

    path(
        'api/review/<int:pk>/approve/',
        approve_record
    ),

    path(
        'api/review/<int:pk>/note/',
        add_analyst_note
    ),

    path(
        'api/audit-logs/',
        audit_logs
    ),
    
path(
    'api/upload/utility/',
    UtilityUploadView.as_view()
),

path(
    'api/upload/travel/',
    TravelUploadView.as_view()
),


]

