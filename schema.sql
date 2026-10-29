CREATE TABLE products (
    product_id   INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name VARCHAR(50),
    catalog_id   INTEGER,
    product_desc TEXT,
    manu_date    DATE,
    prod_type    VARCHAR(10) NOT NULL
);

INSERT INTO products (product_name, catalog_id, product_desc, manu_date, prod_type) VALUES
    ('Tomato', 1001, 'Fresh red tomatoes', '2026-10-01', 'vegetable'),
    ('Apple',  1002, 'Green apples',       '2026-10-05', 'fruit'),
    ('Rice',   1003, 'Long grain rice',    '2026-09-20', 'grain');