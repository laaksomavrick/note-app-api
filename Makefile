up:
	docker-compose up

down:
	docker-compose down

psql:
	psql -U postgres -h 127.0.0.1 -p 5432

migrate:
	yarn db:migrate

seed:
	yarn db:seed

test:
	yarn test:e2e