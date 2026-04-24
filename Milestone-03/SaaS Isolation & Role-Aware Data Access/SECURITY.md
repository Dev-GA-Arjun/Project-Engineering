# SECURITY.md

## Sensitive Fields

- users.salary → financial data
- billing_details.card_last4 → payment data
- billing_details.expiry_date → payment metadata
- billing_details.billing_address → personal data

## Access Control

- Admin → full access
- Manager → no financial data
- User → only own data

## Tenant Isolation

- Every table includes `tenant_id`
- Composite foreign keys enforce same-tenant relationships
- All queries must include `tenant_id`

## Cross-Tenant Risk Prevention

- Composite FK (tenant_id, id) ensures:
  - A project cannot reference a user from another tenant
- Indexed tenant_id ensures fast filtering

## API Security

- Raw DB objects are never returned
- Responses are filtered based on role
- Sensitive fields explicitly removed unless allowed

## Remaining Risks

- If API forgets tenant filter → leakage possible
- Mitigation:
  - Enforce tenant_id in middleware
  - Use scoped query builders
