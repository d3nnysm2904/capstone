CREATE TABLE users (
  username varchar(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE user_recipes (
  username_id varchar(25) REFERENCES users ON DELETE CASCADE,
  recipe_id INTEGER
  
);


