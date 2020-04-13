# Build base
# load resources images
FROM node:12.16.2 as base
COPY ./.eslintrc.json ./.eslintignore ./jest.config.js ./.sequelizerc ./package.json ./package-lock.json ./tsconfig.json ./tsconfig.prod.json ./
COPY ./images ./images
COPY ./types ./types
COPY ./src  ./src
COPY ./db  ./db

FROM base as build-test
WORKDIR /app
RUN npm install --silent

# test
FROM build-test as test
WORKDIR /app

RUN npm run lint
RUN npm run test