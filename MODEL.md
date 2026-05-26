
# Data Model Design

## Model: ActivityRecord

This model stores ESG activity data from different sources.

### Fields:
- id: Unique identifier
- source: Data source (SAP / UTILITY / TRAVEL)
- activity_type: Type of activity (Diesel, Electricity, Flight, etc.)
- quantity: Numeric value of resource usage
- unit: Unit of measurement (Liters, kWh, km)
- status: Approval status (PENDING / APPROVED / REJECTED)
- suspicious: Boolean flag for anomaly detection
- created_at: Timestamp of record creation

---

## Design Reasoning
- Normalized structure to handle multiple ESG sources
- Unified schema for different data formats
- Status field supports review workflow
- Suspicious flag helps detect anomalies

---

## Why This Model?
It allows consistent tracking and auditing of ESG-related activities across multiple systems in a single database.