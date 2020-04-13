# Build base
FROM node:12.16.2 as base
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /app
ENTRYPOINT ["/tini", "--"]

# test
FROM base as test
WORKDIR /app
COPY . .

RUN npm install --silent
RUN npm run lint
RUN npm run test

# load resources images
FROM base as resources
COPY ./images ./images

# compile
FROM resources as compile
WORKDIR /app
COPY ./.sequelizerc ./package.json ./package-lock.json ./tsconfig.json ./tsconfig.prod.json ./
COPY ./types ./types
COPY ./src  ./src

RUN npm install --prod --silent
RUN npm run compile:prod

# release
FROM compile as release
WORKDIR /app
CMD ["node", "./dist/app.js"]