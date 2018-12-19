DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email varchar(64) NOT NULL,
    password varchar(128) NOT NULL
);