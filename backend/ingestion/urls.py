from django.urls import path
from .views import upload_sap_csv, get_records, update_status

urlpatterns = [
    path('upload-sap/', upload_sap_csv),
    path('records/', get_records),
    path('records/<int:id>/update/', update_status),
]