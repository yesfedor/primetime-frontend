#!/bin/bash

docker-compose down

git clean -fd
git reset --hard
git pull

cp ./environments/production.env .env

source ~/.bashrc

ls -a

node -v
nvm --help

npm ci
npm run build

BRANCH_NAME=main ENVIRONMENT_NAME=production PORT=3400 docker-compose up -d --build --force-recreate

docker builder prune -f


