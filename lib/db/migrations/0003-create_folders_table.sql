DROP TABLE IF EXISTS folders CASCADE;
CREATE TABLE IF NOT EXISTS folders (
    id serial PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE INDEX folders_idx_user_id ON folders (user_id);

ALTER SEQUENCE folders_id_seq RESTART WITH 1;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON folders
FOR EACH ROW
EXECUTE PROCEDURE trigger_set_timestamp();