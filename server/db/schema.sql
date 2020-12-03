DROP DATABASE IF EXISTS amazonreviews;

CREATE DATABASE amazonreviews;

USE amazonreviews;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  avatar VARCHAR(2083),
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  overall_rating TINYINT NOT NULL,
  review_date DATETIME NOT NULL,
  headline VARCHAR(100) NOT NULL,
  full_text VARCHAR(1024) NOT NULL,
  helpful INT NOT NULL,
  verified_purchase TINYINT(1),
  product_photo VARCHAR(512),
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u hrstudent -p < server/schema.sql
 *  to create the database and the tables.*/


