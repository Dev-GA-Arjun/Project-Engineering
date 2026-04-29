# Changes.md

## Overview

Implemented complete **4-state UI handling** for the Orders Dashboard:

- Loading State
- Success State
- Empty State
- Error State

---

## Changes Made

### 1. Added Error State Rendering

Previously, the `error` state was never used in UI rendering.

**Fix:**

- Introduced conditional check for `error` before empty/success states.
- Rendered `<ErrorState />` component when API fails.

```jsx
{loading ? (
  // Loading UI
) : error ? (
  <table>
    <tbody>
      <ErrorState message={error} onRetry={loadOrders} />
    </tbody>
  </table>
) : orders.length === 0 ? (
  // Empty State
) : (
  // Success State
)}
```

---

### 2. Fixed Error Message Display

The `ErrorState` component had a placeholder instead of the actual error.

**Before:**

```jsx
Error message goes here
```

**After:**

```jsx
{
  message;
}
```

---

### 3. Connected Retry Functionality

- The **Retry button** now correctly calls `loadOrders`
- Allows re-fetching data after failure

```jsx
<button onClick={onRetry}>Retry</button>
```

---

### 4. Improved Success State Rendering

- Replaced raw `<tr>` mapping with reusable `OrderRow` component
- Ensures consistent styling and cleaner structure

```jsx
<tbody>
  {orders.map((order) => (
    <OrderRow key={order.id} order={order} />
  ))}
</tbody>
```

---

### 5. Structured Table Rendering

- Wrapped `ErrorState` and `EmptyState` inside `<table><tbody>`
- Ensures proper layout and alignment within table UI

---

## Final State Logic

| Condition             | UI Rendered  |
| --------------------- | ------------ |
| `loading === true`    | Spinner UI   |
| `error !== null`      | ErrorState   |
| `orders.length === 0` | EmptyState   |
| otherwise             | Orders Table |

---

## Testing Instructions

Modify `SIMULATE` in `src/mockApi.js`:

```js
'loading' → tests loading state
'success' → tests success state
'empty'   → tests empty state
'error'   → tests error state
```

---

## Result

- All 4 UX states are now handled correctly
- UI is consistent and user-friendly
- Error recovery via retry is functional

---
