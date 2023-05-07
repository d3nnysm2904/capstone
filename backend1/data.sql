-- \echo 'Delete and recreate cook db?'
-- \prompt 'Return for yes or control-C to cancel > ' foo

-- DROP DATABASE cook;
-- CREATE DATABASE cook;
-- \connect cook

-- \i cook-schema.sql

DROP DATABASE IF EXISTS cookdb;

CREATE DATABASE cookdb;

\c cookdb;

DROP TABLE IF EXISTs users 
CASCADE;

DROP TABLE IF EXISTS user_recipes 
CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,  
  username PRIMARY KEY varchar(25) ,
  password TEXT NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE user_recipes (
  id SERIAL PRIMARY KEY,
  username_id INTEGER REFERENCES users ON DELETE CASCADE,
  recipe_id INTEGER
  
);

INSERT INTO users
  (username, password,first_name, last_name,email)
VALUES
  ('d3nny','1234','denny','sanchez','denny@icloud.com');

INSERT INTO users
  (username, password,first_name, last_name,email)
VALUES
('yakio','12343','yetzi','obando','yaki@icloud.com');


INSERT INTO user_recipes
(username_id,recipe_id)
VALUES
(1,20);

INSERT INTO user_recipes
(username_id,recipe_id)
VALUES
(2,20);

