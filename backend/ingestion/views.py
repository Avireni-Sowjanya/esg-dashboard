import csv
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ActivityRecord
from .serializers import ActivityRecordSerializer


# ✅ SAP CSV UPLOAD
@api_view(['POST'])
def upload_sap_csv(request):
    file = request.FILES['file']
    decoded = file.read().decode('utf-8').splitlines()
    reader = csv.DictReader(decoded)

    for row in reader:
        quantity = float(row['Menge'])
        suspicious = quantity < 0 or quantity > 50000

        ActivityRecord.objects.create(
            source='SAP',
            activity_type=row['Kraftstofftyp'],
            quantity=quantity,
            unit=row['Einheit'],
            status="PENDING",
            suspicious=suspicious
        )

    return Response({"message": "SAP CSV uploaded successfully"})


# ✅ GET ALL RECORDS (FIX FOR FRONTEND)
@api_view(['GET'])
def get_records(request):
    records = ActivityRecord.objects.all().order_by('-id')
    serializer = ActivityRecordSerializer(records, many=True)
    return Response(serializer.data)


# ✅ UPDATE STATUS (APPROVE / REJECT BUTTONS)
@csrf_exempt
def update_status(request, id):
    if request.method == "POST":
        data = json.loads(request.body)

        record = ActivityRecord.objects.get(id=id)
        record.status = data.get("status", record.status)
        record.save()

        return JsonResponse({"message": "updated"})