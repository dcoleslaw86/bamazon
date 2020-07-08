DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	item_id INT AUTO_INCREMENT NOT NULL,
    products VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key (item_id)
);

SELECT * FROM products;

INSERT INTO products (products, department_name, price, stock_quantity)
VALUES("Wiper Blades", "Maintenance", 24.99, 5),
("Spark Plugs", "Maintenance", 6.99, 25),
("Air Freshener", "Accessories", 1.29, 40),
("Headlight Bulbs", "Lighting", 1.39, 24),
("Air Filter", "Maintenace", 19.99, 10),
("Oil (per bottle", "Fluid", 24.99, 15),
("Washer Fluid", "Fluid", 3.99, 5),
("Oil Filter", "Maintenance", 32.99, 10),
("Socket Set", "Tools", 39.99, 4),
("Floor Jack", "Tools", 99.99, 5);

