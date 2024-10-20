.PHONY: install
install: ##@development Install the dependencies
install:
	bun install

.PHONY: migrations
migrations: ##@development Generates a new revision that matches latest entity modifications
migrations:
	bun run prisma:migrations

.PHONY: migrate
migrate: ##@development Apply the migrations
migrate:
	bun run prisma:migrate

.PHONY: prisma-generate
prisma-generate: ##@development Generate the Prisma client
prisma-generate:
	bun run prisma:generate

.PHONY: prisma-push
prisma-push: ##@development Push the schema to the database without generating a migration
prisma-push:
	bun run prisma:push

.PHONY: prisma-deploy
prisma-deploy: ##@development Deploy the Prisma schema
prisma-deploy:
	bun run prisma:deploy

.PHONY: seed
seed: ##@development Seed the database
seed:
	bun run prisma:seed

.PHONY: run
run: ##@development Run the application
run:
	bun run dev

.PHONY: drop-db
drop-db: ##@development Drop the database
drop-db:
	bun run drop-db