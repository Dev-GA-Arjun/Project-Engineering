# Composite Index Investigation

## Objective

To understand how the order of columns in a composite index affects query performance in PostgreSQL.

---

## Query

SELECT \*
FROM employees
WHERE department = 'Sales'
AND salary > 50000;

---

## Steps Performed

1. Ran the query using EXPLAIN ANALYZE
2. Created an incorrect index:
   CREATE INDEX idx_salary_department ON employees(salary, department);

3. Observed inefficient or suboptimal usage
4. Dropped the incorrect index
5. Created the corrected index:
   CREATE INDEX idx_department_salary ON employees(department, salary);

6. Ran the query again and observed improved behavior

---

## Key Learnings

- Index column order is critical
- PostgreSQL uses composite indexes from left to right
- Equality conditions should come first
- Range conditions should come after
- Incorrect ordering leads to inefficient query performance

---

## Conclusion

Correcting the column order in a composite index allows PostgreSQL to efficiently use the index, improving query performance and scalability.
