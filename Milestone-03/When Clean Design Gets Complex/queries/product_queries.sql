-- UPDATED PRODUCT QUERIES
-- Compatible with normalized schema (3NF)

-- Query 1
-- Get all products
SELECT * FROM products;


-- Query 2
-- Find products under a specific category

SELECT p.*
FROM products p
JOIN product_categories pc ON p.product_id = pc.product_id
JOIN categories c ON pc.category_id = c.id
WHERE c.name = 'Electronics';


-- Query 3
-- Find supplier details for each product

SELECT 
    p.product_name, 
    s.name AS supplier_name, 
    s.phone_number
FROM products p
JOIN suppliers s ON p.supplier_id = s.id;


-- Query 4
-- Find products with low stock

SELECT 
    p.product_name, 
    i.stock_quantity
FROM products p
JOIN inventory i ON p.product_id = i.product_id
WHERE i.stock_quantity < 10;


-- (Optional Advanced)
-- Query 5: Get products with their categories

SELECT 
    p.product_name,
    c.name AS category
FROM products p
JOIN product_categories pc ON p.product_id = pc.product_id
JOIN categories c ON pc.category_id = c.id;


-- (Optional Advanced)
-- Query 6: Get products with tags

SELECT 
    p.product_name,
    t.name AS tag
FROM products p
JOIN product_tags pt ON p.product_id = pt.product_id
JOIN tags t ON pt.tag_id = t.id;