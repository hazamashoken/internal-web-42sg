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