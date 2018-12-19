DROP TABLE IF EXISTS migrations CASCADE;
CREATE TABLE IF NOT EXISTS migrations (
    id serial PRIMARY KEY,
    name varchar(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);