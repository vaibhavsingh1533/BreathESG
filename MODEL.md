# MODEL.md

## Overview

The system is designed to ingest ESG emissions activity data from multiple enterprise sources, normalize it into a unified schema, and support analyst review workflows before records are finalized for audit reporting.

The architecture prioritizes:

* source traceability
* auditability
* normalization consistency
* multi-source ingestion
* analyst review safety
* future extensibility

---

# Core Data Model

## Organization

Represents a tenant/company using the ESG platform.

### Why

The assignment explicitly requires multi-tenancy support. All ESG records, uploads, and audit actions are associated with an organization.

### Fields

* name
* industry
* country
* created_at

### Notes

The current prototype uses a simplified single-database shared-schema tenancy model.

---

# DataSource

Represents a source ingestion session.

Examples:

* SAP export upload
* utility CSV upload
* travel emissions upload

### Why

ESG systems must preserve source-of-truth lineage. Analysts and auditors need to know:

* where a record came from
* when it was uploaded
* which system produced it

### Fields

* organization
* source_type
* source_name
* uploaded_at

### Supported Source Types

* SAP
* UTILITY
* TRAVEL

---

# RawRecord

Stores the raw imported payload before normalization.

### Why

Raw ingestion preservation is critical for:

* audit traceability
* debugging parser failures
* normalization reproducibility
* replaying ingestion logic

### Fields

* data_source
* raw_payload
* checksum
* status
* created_at

### Design Decisions

Raw payloads are stored as JSON to support heterogeneous schemas across ingestion systems.

Checksums are generated using MD5 hashes to support:

* duplicate detection
* tamper visibility
* source verification

---

# NormalizedEmissionRecord

Represents a cleaned and normalized ESG activity record.

This is the central operational entity used by analysts.

### Why

Different source systems expose:

* inconsistent units
* inconsistent date formats
* inconsistent activity categories

Normalization creates a unified reviewable dataset.

### Fields

* organization
* raw_record
* scope
* category
* activity_date
* activity_value
* original_unit
* normalized_unit
* emission_factor
* co2e_emission
* validation_flags
* review_status
* locked_for_audit
* analyst_notes
* created_at

---

# Scope Handling

The model supports:

* Scope 1
* Scope 2
* Scope 3

### Mapping Logic

| Source              | Category    | Scope   |
| ------------------- | ----------- | ------- |
| SAP Fuel            | Fuel        | Scope 1 |
| Utility Electricity | Electricity | Scope 2 |
| Travel Platform     | Travel      | Scope 3 |

---

# Unit Normalization

Normalization converts heterogeneous source units into standardized operational units.

### Examples

| Original | Normalized |
| -------- | ---------- |
| GAL      | liters     |
| kWh      | kWh        |
| km       | km         |

### Why

Enterprise ESG reporting requires comparable operational metrics before emissions calculations are applied.

---

# Validation Engine

Validation flags are stored directly on normalized records.

### Current Checks

* negative activity values
* suspiciously high values
* missing units
* invalid scope/category combinations
* unrealistic travel distances

### Why

Analysts should review suspicious records before audit lock.

---

# Analyst Workflow

Records move through:

* PENDING
* APPROVED

Approved records become:

* immutable
* locked for audit
* excluded from further editing

---

# AuditLog

Tracks analyst actions performed on ESG records.

### Why

Auditability is a core requirement in ESG reporting workflows.

### Logged Actions

* record approvals
* analyst note additions

### Fields

* record
* action
* old_value
* new_value
* changed_by
* timestamp

---

# Source-of-Truth Tracking

The model preserves lineage through:

* DataSource linkage
* RawRecord linkage
* checksums
* source metadata exposure in UI

This allows analysts to trace every normalized record back to its originating upload.

---

# Multi-Source Ingestion Strategy

The prototype intentionally separates:

* raw ingestion
* normalization
* analyst review

This architecture allows future expansion into:

* async ingestion jobs
* external API connectors
* scheduled sync pipelines
* OCR-based PDF extraction
* emissions factor versioning

without redesigning the core review model.

---

# Tradeoffs

The prototype prioritizes:

* review workflow clarity
* traceability
* ingestion realism

over:

* large-scale ingestion performance
* asynchronous processing
* authentication complexity
* production-grade tenancy isolation

Those areas are intentionally simplified for the prototype scope.
