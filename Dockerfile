FROM node:14.15.2-alpine as builder

ARG NODE_ENV
ARG API_HOST
ENV NODE_ENV=$NODE_ENV
ENV API_HOST=$API_HOST

RUN npm install pm2 -g
WORKDIR /app
COPY . .
RUN npm install && npm run build

EXPOSE 3000

CMD ["pm2-runtime", "dist/ssr/index.js" ,"--env", "$NODE_ENV"]
