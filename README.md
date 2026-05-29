# Breathe ESG Prototype

A full-stack ESG ingestion and analyst review platform built with Django REST Framework and React.

The system ingests emissions activity data from multiple enterprise sources, normalizes records into a unified ESG schema, validates suspicious activity, and supports analyst review workflows before audit lock.

---

# Features

## Multi-Source ESG Ingestion

Supports ingestion from:

* SAP fuel/procurement exports
* utility electricity datasets
* corporate travel exports

---

# Normalization Pipeline

The platform:

* standardizes units
* calculates CO2e emissions
* maps Scope 1/2/3 categories
* preserves raw ingestion payloads

---

# Analyst Review Workflow

Analysts can:

* review normalized records
* inspect validation flags
* approve records
* add analyst notes
* audit historical changes

Approved records become immutable and locked for audit.

---

# Auditability

The system preserves:

* source lineage
* raw ingestion payloads
* upload metadata
* checksums
* analyst actions
* review history

---

# Validation Engine

The platform detects:

* negative activity values
* suspiciously large emissions
* invalid scope mappings
* missing units
* unrealistic travel distances

---

# Dashboard Features

* ESG analytics charts
* audit logs
* responsive review table
* search and filtering
* dark/light mode
* drag-and-drop uploads
* empty/loading states

---

# Tech Stack

## Backend

* Django
* Django REST Framework
* MySQL

## Frontend

* React
* Tailwind CSS
* Recharts

---

# Project Structure

```text id="pw2l7x"
backend/
  emissions/
  ingestion/
  audit/
  organizations/

frontend/
  src/
    components/
    pages/
```

---

# Sample Data

Sample ingestion files are included for:

* SAP exports
* utility electricity data
* travel activity data

---

# Setup

## Backend

```bash id="9d1kxa"
cd backend

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend

```bash id="lw4xme"
cd frontend

npm install

npm run dev
```

---

# Example Upload Sources

## SAP

```csv id="xz8nqa"
MENGE,MEINS
1200,L
450,GAL
```

---

## Utility

```csv id="rq3fvm"
METER_ID,KWH,BILLING_PERIOD
ELEC-1001,4200,2025-03
```

---

## Travel

```csv id="n7kqpl"
EMPLOYEE,FROM_AIRPORT,TO_AIRPORT,DISTANCE_KM
John Doe,DEL,LHR,6700
```

---

# Design Priorities

The prototype intentionally prioritizes:

* realistic ingestion workflows
* analyst usability
* auditability
* source traceability
* normalization architecture

over:

* production-scale infrastructure
* authentication complexity
* async processing pipelines

---

# Documentation

Additional architecture documentation:

* MODEL.md
* DECISIONS.md
* TRADEOFFS.md
* SOURCES.md

---

# Future Improvements

Potential production enhancements:

* async ingestion workers
* OCR utility bill extraction
* direct API integrations
* RBAC/authentication
* emissions factor versioning
* tenant isolation
* ingestion scheduling
* reconciliation workflows