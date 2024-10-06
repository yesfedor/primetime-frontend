#!/bin/bash

docker-compose down

git clean -fd
git reset --hard
git pull

cp ./environments/production.env .env

docker builder prune -f

npm ci
npm run build

BRANCH_NAME=main ENVIRONMENT_NAME=production PORT=3400 docker-compose up -d --force-recreate --no-deps --build --always-recreate-deps
