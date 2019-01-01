import convict from "convict";

/**
 * Module exposing the app-wide configuration object.
 * Sets particular ENV key-value pairs for dev; test; prod.
 */
const config = convict({
  env: {
    doc: "",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  host: {
    doc: "The IP address to bind.",
    format: "ipaddress",
    default: "127.0.0.1",
    env: "HOST",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 3000,
    env: "PORT",
  },
  database: {
    host: {
      default: "localhost",
      env: "DB_HOST",
    },
    port: {
      default: 5432,
      env: "DB_PORT",
    },
    username: {
      default: "postgres",
      env: "DB_USERNAME",
    },
    password: {
      default: "postgres",
      env: "DB_PASSWORD",
    },
    schema: {
      default: "notes_dev",
      env: "DB_SCHEMA",
    },
  },
  secret: {
    jwt: {
      default: "aaaaaaaaaaaaaaaa", // todo read from file
      env: "SECRET_JWT",
    },
    bcrypt: {
      default: "aaaaaaaaaaaaaaaa", // todo read from file
      env: "SECRET_BCRYPT",
    },
  },
});

if (config.get("env") === "test") {
  config.load({
    database: {
      schema: "notes_test",
    },
  });
}

export default config;
