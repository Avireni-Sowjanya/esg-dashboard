import csv

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ActivityRecord


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
            suspicious=suspicious
        )

    return Response({"message": "SAP CSV uploaded successfully"})
from django.http import JsonResponse
from .models import ActivityRecord

def get_records(request):
    data = list(ActivityRecord.objects.values())
    return JsonResponse(data, safe=False)
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from .models import ActivityRecord

@csrf_exempt
def update_status(request, id):
    if request.method == "POST":
        data = json.loads(request.body)
        record = ActivityRecord.objects.get(id=id)

        record.status = data.get("status", record.status)
        record.save()

        return JsonResponse({"message": "updated"})