#!make
.PHONY: copy

copy: copy_api_env copy_native_env

copy_api_env:
	cp apps/express/.env.example apps/express/.env

copy_native_env:
	cp apps/native/.env.example apps/native/.env

api:
	docker compose up --build

ios:
	cd apps/native && npm run ios

