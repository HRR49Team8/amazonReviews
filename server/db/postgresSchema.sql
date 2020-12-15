DROP DATABASE IF EXISTS amazonreviews;

CREATE DATABASE amazonreviews;

DO $$
BEGIN
  CREATE ROLE student LOGIN PASSWORD student;
  EXCEPTION WHEN DUPLICATE_OBJECT THEN
  RAISE NOTICE 'not creating role my_role -- it already exists';
END
$$;

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

-- CREATE TABLE IF NOT EXISTS reviews (
--   id SERIAL PRIMARY KEY,
--   product_id INT NOT NULL,
--   user_id INT NOT NULL,
--   overall_rating SMALLINT NOT NULL,
--   review_date TIMESTAMP NOT NULL,
--   headline VARCHAR(100) NOT NULL,
--   full_text VARCHAR(1024) NOT NULL,
--   helpful INT NOT NULL,
--   verified_purchase BOOLEAN,
--   product_photo VARCHAR(512),
--   CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES products(id),
--   CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
-- );

---------------------- RUN THIS FOR PARTITIONS! ----------------------

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL NOT NULL,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  overall_rating SMALLINT NOT NULL,
  review_date TIMESTAMP NOT NULL,
  headline VARCHAR(100) NOT NULL,
  full_text VARCHAR(1024) NOT NULL,
  helpful INT NOT NULL,
  verified_purchase BOOLEAN,
  product_photo VARCHAR(512)
) PARTITION BY RANGE (product_id);


-- Creates ten partitions from 0-9 of reviews
-- With 10 million products, we partition into 10 partitions of 1 million each
-- Each product has 0-20 reviews, so this becomes about 10 million records for each review partition
DO $part$
DECLARE partition_name TEXT;
BEGIN
  FOR i IN 0..9 LOOP
    EXECUTE format(
      'CREATE TABLE IF NOT EXISTS r_part%s PARTITION OF reviews FOR VALUES FROM (%s) TO (%s)',
      i,
      i * 1000000 + 1,
      i * 1000000 + 1000001
    );
  END LOOP;
END $part$;

---------------------- END SECTION ----------------------

GRANT ALL PRIVILEGES ON DATABASE amazonreviews TO student;
GRANT ALL ON ALL TABLES IN SCHEMA public TO student;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO student;

-- Saved for reference - we're doing this with a bash script now!

-- COPY products(product_name)
-- FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/products.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY users(user_name, country, avatar)
-- FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/users.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY reviews(product_id, user_id, overall_rating, review_date, headline, full_text, helpful, verified_purchase, product_photo)
-- FROM '/home/mikatpt/hackreactor/sdc/reviews/server/csv/reviews.csv'
-- DELIMITER ','
-- CSV HEADER;
