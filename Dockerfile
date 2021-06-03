FROM node:14.15.2-alpine as builder

RUN npm install pm2 -g

WORKDIR /app
COPY . .
RUN npm install && npm run build

EXPOSE 3000
CMD ["pm2-runtime", "dist/ssr/index.js"]