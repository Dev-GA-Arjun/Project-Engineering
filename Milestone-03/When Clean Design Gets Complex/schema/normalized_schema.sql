-- PRODUCTS TABLE
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    supplier_id INT,

    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

-- CATEGORIES TABLE
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- PRODUCT ↔ CATEGORY (Many-to-Many)
CREATE TABLE product_categories (
    product_id INT,
    category_id INT,

    PRIMARY KEY (product_id, category_id),

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- TAGS TABLE
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- PRODUCT ↔ TAGS (Many-to-Many)
CREATE TABLE product_tags (
    product_id INT,
    tag_id INT,

    PRIMARY KEY (product_id, tag_id),

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

-- SUPPLIERS TABLE
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20),
    email VARCHAR(100) UNIQUE
);

-- INVENTORY TABLE
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    location VARCHAR(100),
    stock_quantity INT NOT NULL,

    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);