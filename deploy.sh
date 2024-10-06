#!/bin/bash

docker-compose down

git clean -fd
git reset --hard
git pull

cp ./environments/production.env .env

docker builder prune -f

npm ci
npm run build

BRANCH_NAME=main ENVIRONMENT_NAME=production PORT=3400 docker-compose build --no-cache -t primetme-frontend:latest
BRANCH_NAME=main ENVIRONMENT_NAME=production PORT=3400 docker-compose up -d --build --force-recreate
