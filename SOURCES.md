# SOURCES.md

# Overview

This document explains:

* the real-world source formats researched
* ingestion assumptions made
* sample data structure choices
* limitations of the prototype implementation

The goal was not to perfectly reproduce enterprise integrations, but to design ingestion behavior that realistically reflects how ESG data commonly appears in operational workflows.

---

# 1. SAP Fuel / Procurement Data

# Research Summary

SAP ecosystems expose many integration patterns depending on organization maturity and ERP configuration.

Common patterns researched:

* IDoc exports
* BAPI integrations
* OData APIs
* flat-file CSV exports

For this prototype, flat-file exports were chosen because they remain common in operational sustainability reporting workflows where teams manually export datasets into spreadsheets for downstream ESG processing.

---

# Prototype Format

The prototype models SAP-style CSV exports with operational fuel activity fields.

### Example Fields

| Field | Meaning  |
| ----- | -------- |
| MENGE | quantity |
| MEINS | unit     |

These German field names were intentionally selected because many SAP environments expose localized operational terminology.

---

# Example Sample Data

```csv
MENGE,MEINS
1200,L
450,GAL
```

---

# What The Prototype Handles

* inconsistent units
* operational fuel quantities
* normalization into standard units
* Scope 1 categorization
* validation checks
* raw payload preservation

---

# What Would Break In Production

The prototype intentionally does not handle:

* SAP authentication
* incremental syncs
* plant hierarchy mappings
* procurement category mapping
* material master joins
* schema drift across business units
* very large export files

A production system would require:

* connector orchestration
* ingestion scheduling
* reconciliation logic
* stronger schema validation

---

# 2. Utility Electricity Data

# Research Summary

Facilities teams commonly retrieve electricity consumption data through:

* utility web portals
* CSV exports
* PDF bills
* vendor APIs

PDF parsing was intentionally avoided because:

* layouts vary heavily
* OCR reliability becomes a major problem
* extraction quality varies significantly across providers

CSV exports were selected because they are operationally realistic while remaining implementable within prototype scope.

---

# Prototype Format

The prototype models monthly electricity consumption exports.

### Example Fields

| Field          | Meaning                   |
| -------------- | ------------------------- |
| METER_ID       | facility meter identifier |
| KWH            | electricity consumption   |
| BILLING_PERIOD | billing cycle             |

---

# Example Sample Data

```csv
METER_ID,KWH,BILLING_PERIOD
ELEC-1001,4200,2025-03
ELEC-1002,3150,2025-03
```

---

# What The Prototype Handles

* electricity consumption ingestion
* Scope 2 classification
* kWh normalization
* emissions calculations
* validation workflows

---

# What Would Break In Production

The prototype does not handle:

* tariff structures
* peak/off-peak usage
* demand charges
* timezone normalization
* meter reconciliation
* estimated readings
* overlapping billing periods

A real implementation would also require:

* facility hierarchy modeling
* utility-provider-specific parsing
* bill version handling

---

# 3. Corporate Travel Data

# Research Summary

Travel management platforms such as:

* SAP Concur
* Navan

commonly expose:

* activity exports
* expense reports
* booking records
* API feeds

Travel datasets often contain:

* airport codes
* trip categories
* incomplete distance data

rather than direct emissions values.

The prototype models simplified travel exports using distance-based emissions estimation.

---

# Prototype Format

### Example Fields

| Field        | Meaning             |
| ------------ | ------------------- |
| EMPLOYEE     | traveler            |
| FROM_AIRPORT | departure airport   |
| TO_AIRPORT   | destination airport |
| DISTANCE_KM  | trip distance       |

---

# Example Sample Data

```csv
EMPLOYEE,FROM_AIRPORT,TO_AIRPORT,DISTANCE_KM
John Doe,DEL,LHR,6700
Sarah Kim,SFO,JFK,4200
```

---

# What The Prototype Handles

* travel ingestion
* Scope 3 classification
* distance-based emissions
* validation checks
* analyst review workflow

---

# What Would Break In Production

The prototype intentionally does not handle:

* cabin class
* radiative forcing
* hotel emissions
* rail travel
* car rentals
* duplicate itineraries
* canceled trips
* timezone handling
* mileage reimbursement programs

A production implementation would likely require:

* external distance calculation services
* airport metadata mapping
* travel category taxonomies
* supplier integrations

---

# Why These Sources Were Chosen

The assignment emphasized:

* realistic ingestion thinking
* defensible architecture
* handling messy operational data

The prototype intentionally focused on:

* realistic operational exports
* heterogeneous schemas
* analyst review workflows
* auditability
* normalization pipelines

rather than attempting unrealistic full enterprise integrations within the prototype timeline.
