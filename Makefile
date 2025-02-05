include .env

.PHONY: default
default:
	echo "No default target"

.PHONY: dev
dev:
	npm run dev

.PHONY: db-push
db-push:
	npx drizzle-kit push
# see: https://orm.drizzle.team/kit-docs/overview#schema-updates
.PHONY: db-generate
db-generate:
	npx drizzle-kit generate

.PHONY: db-migrate
db-migrate:
	npx drizzle-kit generate

.PHONY: db-studio
db-studio:
	npx drizzle-kit studio

.PHONY: db-drop
db-drop:
	npx drizzle-kit drop

.PHONY: auth-generate
auth-generate:
	npx @better-auth/cli generate --output ./drizzle/schemas/auth.ts

.PHONY: drop-tables
drop-tables:
	@read -p "Enter Y to confirm dropping all tables: " confirm; \
	if [ $$confirm = "Y" ]; then \
		psql ${DATABASE_URL} -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;" ;\
		exit 0; \
	fi; \