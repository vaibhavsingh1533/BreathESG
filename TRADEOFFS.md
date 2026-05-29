# TRADEOFFS.md

# Overview

The prototype intentionally prioritized:

* ingestion realism
* analyst workflow quality
* auditability
* source traceability

over production-scale infrastructure concerns.

This document explains the most important features intentionally not implemented within the 4-day prototype scope.

---

# 1. Real External API Integrations

## Not Built

Direct integrations with:

* SAP OData APIs
* Concur APIs
* Navan APIs
* utility provider APIs

## Why

The assignment emphasized:

* ingestion realism
* normalization workflows
* analyst review systems

rather than API authentication complexity.

Building stable external integrations would require:

* OAuth handling
* credential storage
* pagination handling
* rate limiting
* retry pipelines
* schema drift management

which would consume a disproportionate amount of prototype time.

## What Was Built Instead

The system supports realistic CSV exports that mirror:

* SAP operational exports
* utility portal exports
* travel activity exports

This allowed focus on:

* normalization architecture
* validation workflows
* analyst review UX

which are more central to the assignment.

---

# 2. Asynchronous Processing Pipelines

## Not Built

Background ingestion workers and async task queues.

Examples:

* Celery
* Redis queues
* batch processing workers

## Why

The prototype processes uploads synchronously to keep the architecture:

* understandable
* debuggable
* reviewable within assignment constraints

For the prototype ingestion volumes, synchronous processing is acceptable.

## Production Consideration

A production ESG platform would likely require:

* async ingestion jobs
* retry queues
* dead-letter queues
* ingestion monitoring
* distributed workers

especially for:

* PDF extraction
* OCR pipelines
* very large SAP exports

---

# 3. Authentication and RBAC

## Not Built

* user authentication
* role-based permissions
* organization-level access control

## Why

The assignment focused primarily on:

* ingestion architecture
* data normalization
* analyst review workflow

rather than identity management.

Adding:

* auth flows
* JWT refresh logic
* RBAC enforcement
* permission matrices

would significantly expand implementation scope without improving the core ESG workflow demonstration.

## What Was Prioritized Instead

Time was invested into:

* auditability
* validation systems
* source lineage
* analyst review UX

which are more directly tied to ESG operations.

---

# Additional Simplifications

## Static Emission Factors

Used simplified static emission factors rather than:

* regional factor libraries
* versioned methodologies
* supplier-specific factors

This kept focus on ingestion and workflow architecture.

---

## Shared-Schema Multi-Tenancy

Used a simplified shared-schema tenancy model.

Did not implement:

* schema isolation
* tenant-level encryption
* tenant provisioning workflows

---

## Simplified ESG Categories

The prototype handles:

* Fuel
* Electricity
* Travel
* Procurement

but does not yet support:

* refrigerants
* waste streams
* water usage
* embodied carbon
* supplier-specific lifecycle emissions

---

# Why These Tradeoffs Were Reasonable

The assignment explicitly allowed prioritization decisions and encouraged:

* thoughtful scope control
* honest tradeoffs
* defendable engineering decisions

The prototype intentionally focused on:

* realistic ingestion workflows
* audit-safe review processes
* strong data lineage
* analyst usability

because those are the highest-leverage aspects of an ESG operations platform within a constrained prototype timeline.
