#!/bin/bash
ENVIRONMENT_NAME=production
BRANCH_NAME=main

cd /home/projects/primetime-frontend-production

docker-compose down

git clean -fd
git reset --hard
git pull

cp ./environments/production.env .env

ls -a

node -v
nvm --help

npm ci
npm run build

BRANCH_NAME=${BRANCH_NAME} ENVIRONMENT_NAME=${ENVIRONMENT_NAME} PORT=3400 docker-compose up -d --build --force-recreate

docker builder prune -f


