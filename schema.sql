DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    products VARCHAR(30) NOT NULL,
    department_id VARCHAR(30) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(11) NOT NULL,
    PRIMARY KEY (id)
)