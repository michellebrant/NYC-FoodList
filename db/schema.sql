DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

DROP TABLE IF EXISTS lists;

CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  list_name VARCHAR(255),
  location VARCHAR(255),
  restaurant_name VARCHAR(255),
  address VARCHAR(255),
  comments VARCHAR(1000),
  users_id INTEGER
);
