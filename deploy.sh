#!/bin/bash
ENVIRONMENT_NAME=production
BRANCH_NAME=main

source ~/.bashrc

cd "/home/projects/primetime-frontend-${ENVIRONMENT_NAME}"

docker-compose down

git clean -fd
git reset --hard
git pull

cp "./environments/${ENVIRONMENT_NAME}.env" .env

npm ci
npm run build

# BRANCH_NAME=${BRANCH_NAME} ENVIRONMENT_NAME=${ENVIRONMENT_NAME} PORT=3400 docker-compose up -d --build --force-recreate

docker builder prune -f
