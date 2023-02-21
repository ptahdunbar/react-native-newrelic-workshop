#!make
.PHONY: copy

copy: copy_api_env copy_expo_env

copy_api_env:
	cp apps/express/.env.example apps/express/.env

copy_expo_env:
	cp apps/expo/.env.example apps/expo/.env

api:
	docker compose up --build

ios:
	cd apps/native && npm run ios

