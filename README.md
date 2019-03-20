# Express CRUD api

This app is intended to be a simple backend for a note taking application. It is built on top of Express and expects a PostgreSQL database. There is a development and production dependency on Docker.

It is intentionally a minimal api with most things hand rolled. I don't have enough hubris to recommend you use it in production, but it is deployable and functional, and I hope serves as a good example for others to base their work on.

This app is agnostic to any particular platform, but does have some google-centric configuration for app engine. Two Dockerfiles are present, one for the api, and another intended as a job for running database migrations.

Gitlab's CI detects when the relevant directories are changed and merged into master, and then does the appropriate thing. Changes in `src/*` will trigger a container build and push to google's container registry, and then a subsequent deployment to app engine. Changes in `lib/db/*` will trigger the migration to be built and ran. The config for the migrator (e.g the url, username, password) exists in a `migrator_env` for which there is an example file. Do not commit this file.

There is a functional test suite which requires having a connection to a database. `make up` provides this via docker-compose.

## Getting a dev env up

- `make up`
- `make create`
- `make migrate`
- `make seed`
- `make test`
- `yarn start`
