
from django.contrib import admin
from django.urls import path

from audit.views import audit_logs
from django.http import JsonResponse

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

def home(request):
    return JsonResponse({
        "status": "success",
        "message": "Breathe ESG Backend API Running",
        "frontend": "https://breath-esg-sigma.vercel.app",
        "endpoints": [
            "/api/review/",
            "/api/audit-logs/",
            "/api/upload/sap/",
            "/api/upload/utility/",
            "/api/upload/travel/"
        ]
    })



urlpatterns = [

    path('', home),

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

