CREATE KEYSPACE IF NOT EXISTS amazonreviews
WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 };

USE amazonreviews;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE products (
  id int PRIMARY KEY,
  product_name VARCHAR
);

CREATE TABLE users(
  id int PRIMARY KEY,
  user_name VARCHAR,
  country VARCHAR,
  avatar VARCHAR
);

CREATE TABLE reviews(
  id int PRIMARY KEY,
  product_id int,
  user_id int,
  overall_rating SMALLINT,
  review_date TIMESTAMP,
  headline VARCHAR,
  full_text VARCHAR,
  helpful int,
  verified_purchase TINYINT,
  product_photo VARCHAR
);

CREATE INDEX IF NOT EXISTS prod_idx
ON amazonreviews.products (product_name);

CREATE INDEX IF NOT EXISTS prod_rvw_idx
ON amazonreviews.reviews (product_id);

COPY products (id, product_name)
FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/C_products.csv'
WITH DELIMITER = ',' AND
HEADER = true;

COPY users(id, user_name, country, avatar)
FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/C_users.csv'
WITH DELIMITER = ',' AND
HEADER = true;


COPY reviews (id, product_id, user_id, overall_rating, review_date, headline, full_text, helpful, verified_purchase, product_photo)
FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/C_reviews.csv'
WITH DELIMITER = ',' AND
HEADER = true;

-- cqlsh -f server/db/cassandra.cql localhost
