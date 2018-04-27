DROP DATABASE IF EXISTS bamazon2_db;
CREATE DATABASE bamazon2_db;
USE bamazon2_db;

CREATE TABLE products (
	item_id INT NOT NULL auto_increment,
    product_name VARCHAR (30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Manduka ekoLite Yoga Mat", "fitness", 72.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("FitLifestyleCo Yoga Mat Strap", "fitness", 12.99, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Basics Yoga Towel", "fitness", 14.05, 24);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Economy Bookends", "Office Products", 18.28, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kerry James Marshall:Mastry", "Books", 37.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Arvok Laptop Sleeve", "Technology", 10.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hommit Gas Grill Cover", "Outdoor Living", 19.99, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Islandborn", "Books", 12.75, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Manduka Organic Mat Cleaner", "Fitness", 11.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AstroAI Digital Tire Gauge", "Automotive", 8.87, 50);

