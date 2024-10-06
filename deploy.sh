#!/bin/bash

docker-compose down

git clean -fd
git reset --hard
git pull

cp ./environments/production.env .env

npm ci
npm run build

docker-compose up --build -d --build-arg BRANCH_NAME=main --build-arg ENVIRONMENT_NAME=production --build-arg PORT=3400

docker builder prune -f
