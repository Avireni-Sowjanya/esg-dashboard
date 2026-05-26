from django.db import models

class ActivityRecord(models.Model):
    SOURCE_CHOICES = [
        ('SAP', 'SAP'),
        ('UTILITY', 'UTILITY'),
        ('TRAVEL', 'TRAVEL'),
    ]

    STATUS_CHOICES = [
        ('PENDING', 'PENDING'),
        ('APPROVED', 'APPROVED'),
        ('REJECTED', 'REJECTED'),
    ]

    source = models.CharField(max_length=20, choices=SOURCE_CHOICES)
    activity_type = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=50)

    status = models.CharField(max_length=20, default='PENDING', choices=STATUS_CHOICES)
    suspicious = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)