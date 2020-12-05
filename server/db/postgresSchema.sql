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
  product_photo VARCHAR(512),
  CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
  CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE INDEX prod_id_idx
ON reviews(product_id);

GRANT ALL PRIVILEGES ON DATABASE amazonreviews TO student;
GRANT ALL ON ALL TABLES IN SCHEMA public TO student;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO student;

COPY products(product_name)
FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/products.csv'
DELIMITER ','
CSV HEADER;

COPY users(user_name, country, avatar)
FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/users.csv'
DELIMITER ','
CSV HEADER;

-- COPY reviews(product_id, user_id, overall_rating, review_date, headline, full_text, helpful, verified_purchase, product_photo)
-- FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

/*  Execute this file from the command line by typing:
 *    sudo -u postgres psql < server/db/postgresSchema.sql
 *  to create the database and the tables.
 *
 *  pv server/db/postgresSchema.sql | sudo -u postgres psql
 *
 *  To track progress of reviews copy:
 *  pv server/csv/reviews.csv | sudo -u postgres psql -d amazonreviews -c "copy reviews(product_id, user_id, overall_rating, review_date, headline, full_text, helpful, verified_purchase, product_photo) from stdin delimiter ',' CSV HEADER;"
 */


