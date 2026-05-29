# DECISIONS.md

# Overview

This document explains the major implementation decisions made during the prototype build, including assumptions, simplifications, and tradeoffs caused by time constraints and ambiguity in the assignment.

The prototype was designed to prioritize:

* realistic ingestion behavior
* analyst review workflows
* auditability
* source traceability
* extensibility

over production-scale infrastructure concerns.

---

# Database Choice

## Decision

Used MySQL instead of PostgreSQL.

## Why

The prototype prioritizes implementation speed and local development simplicity. MySQL support in Django is mature and sufficient for:

* structured ESG records
* audit logs
* ingestion metadata
* relational lineage tracking

The assignment did not require database-specific analytical features.

## Tradeoff

PostgreSQL would be preferable in production for:

* JSON querying
* analytical workloads
* advanced indexing
* partitioning large ingestion datasets

---

# SAP Ingestion Strategy

## Decision

Handled SAP flat-file CSV style exports.

## Why

Real SAP ecosystems expose many integration patterns:

* IDoc
* BAPI
* OData
* flat exports

For a 4-day prototype, flat-file CSV exports are realistic because many sustainability and operations teams still manually export SAP procurement/fuel datasets into spreadsheets for downstream reporting.

The prototype intentionally simulates:

* German column names
* inconsistent units
* operational fuel records

## Handled Fields

* MENGE
* MEINS

## Ignored

* plant hierarchy mappings
* SAP auth flows
* document versioning
* incremental syncs

---

# Utility Ingestion Strategy

## Decision

Handled utility CSV exports instead of PDFs.

## Why

Many facilities teams export billing or consumption data directly from utility portals into CSV format for internal analysis.

PDF extraction introduces:

* OCR complexity
* layout variability
* parser instability

which would consume disproportionate time in a prototype environment.

## Handled Fields

* KWH
* BILLING_PERIOD
* METER_ID

## Ignored

* tariff breakdowns
* demand charges
* time-of-use pricing
* meter reconciliation

---

# Travel Ingestion Strategy

## Decision

Handled CSV exports representing travel platform exports.

## Why

Platforms such as:

* Concur
* Navan

commonly expose:

* CSV exports
* expense exports
* travel activity feeds

The prototype models:

* airport pairs
* distance-based travel emissions

rather than attempting full API integrations.

## Handled Fields

* FROM_AIRPORT
* TO_AIRPORT
* DISTANCE_KM

## Ignored

* cabin class
* hotel emissions
* rail emissions
* rental car categories
* mileage reimbursement workflows

---

# Normalization Design

## Decision

Separated:

* raw ingestion
* normalized operational records

## Why

Real ESG systems require:

* replayability
* auditability
* debugging visibility

Storing raw records separately preserves:

* source fidelity
* original units
* ingestion lineage

while normalized records provide a clean operational review layer.

---

# Validation Engine Design

## Decision

Validation occurs after normalization but before analyst approval.

## Why

The analyst review queue should surface:

* suspicious values
* missing units
* unrealistic activity patterns

before records are finalized for audit.

This mirrors real ESG operations workflows where analysts review ingestion quality prior to reporting signoff.

---

# Audit Locking

## Decision

Approved records become immutable.

## Why

ESG reporting workflows require:

* traceability
* audit safety
* controlled review state

The prototype locks records after approval to simulate:

* audit freeze
* review completion
* downstream reporting integrity

---

# Multi-Tenancy Approach

## Decision

Used shared-schema multi-tenancy.

## Why

The prototype only needed to demonstrate organizational separation conceptually.

A shared-schema approach:

* simplified development
* reduced infrastructure complexity
* allowed organization-linked lineage tracking

## Production Consideration

A production deployment may use:

* row-level isolation
* schema-per-tenant
* separate databases

depending on scale and compliance requirements.

---

# Frontend UX Decisions

## Decision

Prioritized analyst usability over visual minimalism.

## Added

* responsive layouts
* drag-drop uploads
* validation badges
* charts
* audit history
* dark/light mode
* loading states
* empty states

## Why

The assignment explicitly emphasized:

* analyst workflows
* non-engineer usability

The UI was intentionally designed to feel like an internal operations platform rather than a generic CRUD application.

---

# Emission Factor Simplification

## Decision

Used static emission factors.

## Why

The prototype focuses on ingestion architecture and analyst workflow rather than emissions methodology accuracy.

## Production Consideration

A real ESG platform would require:

* region-aware factors
* versioned factor libraries
* methodology transparency
* supplier-specific emissions factors

---

# Questions I Would Ask The PM

## Data Quality

* How often are source schemas changing?
* Are uploads manually reviewed today?

## SAP Scope

* Which SAP modules are in use?
* Is procurement included or fuel only?

## Utility Scope

* Are facilities globally distributed?
* Are bills standardized?

## Travel Scope

* Should hotel emissions be included?
* Should radiative forcing adjustments apply to flights?

## Audit Requirements

* What level of immutability is required?
* Do analysts need rollback workflows?

## Scale

* Expected ingestion volume?
* Expected tenant count?
* Real-time or batch ingestion expectations?
