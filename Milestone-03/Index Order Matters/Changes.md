# Document your index fixes here

- Original index:
  CREATE INDEX idx_salary_department
  ON employees(salary, department);

- Issue observed:
  The index column order did not match the query filtering pattern. The query filters by department first (equality) and then salary (range), but the index starts with salary. Due to this, PostgreSQL could not efficiently use the index and query performance was suboptimal.

- Fixed index:
  CREATE INDEX idx_department_salary
  ON employees(department, salary);

- Performance improvement:
  After fixing the index order, PostgreSQL is able to perform an Index Scan using the corrected index. The database first filters by department and then applies the salary condition efficiently. This improves query performance and ensures better scalability for larger datasets.
