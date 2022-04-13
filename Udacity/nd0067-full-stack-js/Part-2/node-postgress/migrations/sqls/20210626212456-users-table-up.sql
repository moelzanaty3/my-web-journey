-- create table users
create table users (
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  id SERIAL PRIMARY KEY
);