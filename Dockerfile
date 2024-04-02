ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM dev AS build

RUN npm run build

FROM node:${NODE_VERSION} AS prod

ARG NODE_ENV=production
ARG PORT=4000
ENV NODE_ENV=${NODE_ENV}
ENV PORT=${PORT}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=build /usr/src/app/dist ./dist

EXPOSE ${PORT}

CMD ["node", "dist/main"]