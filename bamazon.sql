-- Homework SQL --

CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
item_id INTEGER(11) auto_increment not null primary key,
product_name varchar(50) not null,
department_name varchar(50) not null,
price integer(50) not null,
stock_quantity integer(50) not null
);

insert into products(product_name, department_name, price, stock_quantity)
VALUES("Halo 3", "Video Games", 60, 360),
("Macbook", "Apple Laptops", 2200, 20),
("Apples", "Produce", 2, 100),
("Halo Combat Evoled", "Video Games", 60, 180),
("Bubble Gum", "Candy", .99, 100),
("Harry Potter", "Reading", 12, 22),
("Alien", "Movies", 8, 25),
("Percy Jackson and the Lighting Thief", "Reading", 10, 3),
("Sweedish Fish", "Candy", 3, 41),
("Oranges", "Produce", 2, 420)