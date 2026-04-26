# AUDIT.md

## 1. Multi-Tenancy Issues

- No `tenant_id` in `users`, `projects`, or `billing_details`.
- Data from different organizations is mixed.
- Example: querying `users` returns both Pouch and Velocity employees.

## 2. Users Table

- Missing `tenant_id` → no isolation.
- `email` is nullable → invalid user records possible.
- No `UNIQUE(email, tenant_id)` → duplicate emails per tenant.
- `role` is free-text → inconsistent values possible.
- `salary` is sensitive but unprotected.
- No timestamps (`created_at`, `updated_at`).
- No soft delete (`deleted_at`).
- No index on `email`.

## 3. Projects Table

- Missing `tenant_id`.
- No `owner_id` or relation to users.
- `status` is free-text.
- No timestamps.
- `budget` may be negative (no constraint).

## 4. Billing Details Table

- Missing `tenant_id`.
- `user_id` not `NOT NULL`.
- No tenant-bound FK → user from another tenant can be referenced.
- `expiry_date` stored as VARCHAR → poor validation.
- Sensitive financial data stored directly.
- No timestamps.
- No uniqueness constraints.

## 5. Relationship Integrity

- No enforcement that related records belong to same tenant.
- Cross-tenant reference possible via foreign keys.

## 6. Missing Join Tables

- No `project_members` table → users cannot be assigned to projects.

## 7. Indexing Issues

- No indexes except PKs.
- Missing indexes on:
  - `tenant_id`
  - `email`
  - `user_id`
  - `status`

## 8. Data Consistency

- Free-text enums (`role`, `status`).
- No CHECK constraints on `salary`, `budget`.

## 9. Security Issues

Sensitive fields:

- `users.salary`
- `billing_details.card_last4`
- `billing_details.expiry_date`
- `billing_details.billing_address`

No access control defined.

## 10. Seed Data Issues

- Mixed tenants without separation.
- Hardcoded IDs.
