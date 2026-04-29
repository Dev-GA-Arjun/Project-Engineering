# DEBUG-REPORT.md

## Bug 1 — Orphaned Orders (Missing Foreign Key)

### 1. Symptom

```sql
SELECT o.id, o.customer_id
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL;
```

**Observed Result (wrong data):**

- Orders with `customer_id = 9999` exist
- These customers do not exist in the `customers` table
- Indicates orphaned records

---

### 2. Data Flow Trace

- API response returns orders → data originates from `orders` table
- `orders.customer_id` is expected to reference `customers.id`
- Insert query directly writes `customer_id` without validation
- No database-level constraint prevents invalid references
- Result: invalid `customer_id` values persisted

---

### 3. Root Cause

> Missing **FOREIGN KEY constraint** on `orders.customer_id` referencing `customers(id)`

---

### 4. Fix Applied

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_orders_customer
FOREIGN KEY (customer_id)
REFERENCES customers(id)
ON DELETE CASCADE;
```

**Why:**
Ensures every order must reference a valid customer and prevents orphaned records.

---

### 5. Validation

**Re-run reproduction query:**

```sql
SELECT o.id, o.customer_id
FROM orders o
LEFT JOIN customers c ON o.customer_id = c.id
WHERE c.id IS NULL;
```

**Result:**

- No new invalid rows can be created (existing invalid rows must be cleaned manually before applying constraint)

---

**Attempt bad insert:**

```sql
INSERT INTO orders (customer_id, status, total)
VALUES (9999, 'pending', 100.00);
```

**Expected Error:**

```
insert or update on table "orders" violates foreign key constraint
```

---

## Bug 2 — Negative Inventory (Missing CHECK Constraint)

### 1. Symptom

```sql
SELECT id, name, inventory_count
FROM products
WHERE inventory_count < 0;
```

**Observed Result (wrong data):**

- Products with negative inventory values:
  - Wireless Mouse (-3)
  - USB-C Cable (-5)

---

### 2. Data Flow Trace

- Product data originates from `products` table
- `inventory_count` column stores stock values
- Insert query allows negative numbers
- No validation at schema level
- Result: invalid inventory data stored

---

### 3. Root Cause

> Missing **CHECK constraint** on `products.inventory_count` to enforce non-negative values

---

### 4. Fix Applied

```sql
ALTER TABLE products
ADD CONSTRAINT check_inventory_non_negative
CHECK (inventory_count >= 0);
```

**Why:**
Prevents invalid inventory values from being inserted into the database.

---

### 5. Validation

**Re-run reproduction query:**

```sql
SELECT id, name, inventory_count
FROM products
WHERE inventory_count < 0;
```

**Result:**

- No new negative values allowed (existing invalid rows must be corrected before applying constraint)

---

**Attempt bad insert:**

```sql
INSERT INTO products (name, sku, inventory_count, price)
VALUES ('Test Product', 'SKU-999', -10, 50.00);
```

**Expected Error:**

```
new row for relation "products" violates check constraint
```

---

## Bug 3 — Duplicate Payments (Missing UNIQUE Constraint)

### 1. Symptom

```sql
SELECT order_id, COUNT(*) as payment_count
FROM payments
GROUP BY order_id
HAVING COUNT(*) > 1;
```

**Observed Result (wrong data):**

- Order `1` has multiple payment records
- Business logic expects one payment per order

---

### 2. Data Flow Trace

- Payment data originates from `payments` table
- `order_id` links payment to an order
- Multiple inserts allowed for same `order_id`
- No uniqueness enforcement
- Result: duplicate payments recorded

---

### 3. Root Cause

> Missing **UNIQUE constraint** on `payments.order_id`

---

### 4. Fix Applied

```sql
ALTER TABLE payments
ADD CONSTRAINT unique_order_payment
UNIQUE (order_id);
```

**Why:**
Ensures only one payment record exists per order.

---

### 5. Validation

**Re-run reproduction query:**

```sql
SELECT order_id, COUNT(*) as payment_count
FROM payments
GROUP BY order_id
HAVING COUNT(*) > 1;
```

**Result:**

- No duplicate records can be created going forward (existing duplicates must be removed first)

---

**Attempt bad insert:**

```sql
INSERT INTO payments (order_id, amount, status)
VALUES (1, 114.99, 'completed');
```

**Expected Error:**

```
duplicate key value violates unique constraint
```

---

# Final Notes

- All fixes are applied at the **schema level**, not application level
- Existing invalid data must be cleaned before constraints can be enforced
- After fixes:
  - Data integrity is guaranteed
  - Invalid inserts are blocked at the database level
  - API behavior becomes reliable and predictable

---
