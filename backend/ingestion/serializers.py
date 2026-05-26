from rest_framework import serializers
from .models import ActivityRecord


class ActivityRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivityRecord
        fields = '__all__'