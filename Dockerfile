FROM node:22.6.0-alpine

WORKDIR /app

COPY .output /app/.output

EXPOSE 3000

CMD ["node", "/app/server/index.mjs"]
