\c amazonreviews;

CREATE INDEX name_idx
ON users(user_name);

CREATE INDEX prod_id_idx
ON reviews(product_id);

-- Run this when using partitioned review table!

DO $index$
BEGIN
  FOR i IN 0..9 LOOP
    EXECUTE format('CREATE INDEX ON r_part%s (id)', i);
    EXECUTE format('CREATE INDEX ON r_part%s (product_id)', i);
  END LOOP;
END $index$;