# ESG Data Review Dashboard

##  Project Overview
This project is an ESG (Environmental, Social, Governance) Data Review Dashboard built using Django (backend) and React (frontend). It ingests activity data from multiple sources (SAP, Utility, Travel), detects anomalies, and allows users to approve or reject records.

---

## Tech Stack
- Frontend: React.js
- Backend: Django REST Framework
- Database: SQLite
- API Communication: REST APIs

---

## Features
- Upload and ingest CSV data
- Normalize ESG activity records
- Detect suspicious activity (e.g., unusually high values)
- Dashboard view of all records
- Approve / Reject workflow
- Admin panel for data management

---

##  How to Run Backend
```bash
cd backend
python manage.py runserver
##  How to Run Frontend
cd frontend
npm install
npm start