DROP DATABASE IF EXISTS amazonreviews;

CREATE DATABASE amazonreviews;

\c amazonreviews;

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  avatar VARCHAR(2083)
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  overall_rating SMALLINT NOT NULL,
  review_date TIMESTAMP NOT NULL,
  headline VARCHAR(100) NOT NULL,
  full_text VARCHAR(1024) NOT NULL,
  helpful INT NOT NULL,
  verified_purchase BOOLEAN,
  product_photo VARCHAR(512)
);


/*  Execute this file from the command line by typing:
 *    mysql -u hrstudent -p < server/schema.sql
 *  to create the database and the tables.*/


