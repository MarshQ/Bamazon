CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INT(10),
    stock_quantity INT(10),
    product_sales INT(10),
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Switch", "Electronics", 300, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PS4", "Electronics", 300, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("XBOX1", "Electronics", 300, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nerdy Nummies", "Books", 25, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amiibo", "Electronics", 15, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bionicle", "Toys", 12, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hoodies", "Clothes", 35, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Modern Desk", "Furnature", 180, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Towels", "Home Goods", 30, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Washers", "Appliances", 250, 3);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    over_head_costs INT(11),
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 2500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Books", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothes", 1000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Furnature", 2000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Toys", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Goods", 1500);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Appliances", 3500);


