#!/bin/bash

docker-compose down

git clean -fd
git reset --hard
git pull

cp ./environments/production.env .env

npm ci
npm run build

BRANCH_NAME=main ENVIRONMENT_NAME=production PORT=3400 docker-compose up --build -d --no-cache

docker builder prune -f
