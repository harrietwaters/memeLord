# Build base
FROM node:12.16 as base
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /app
ENTRYPOINT ["/tini", "--"]

# compile
FROM base as compile

WORKDIR /app
COPY ./images ./images/
COPY ./db ./db
COPY ./src .src/
COPY ./types ./types
COPY ./jest.config.js ./
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./.sequelizerc ./
COPY ./tsconfig.json ./
COPY ./tsconfig.prod.json ./

RUN npm install --prod
RUN npm run compile:prod

# Release
FROM base as release
WORKDIR /app
CMD ["node", "./dist/app.js"]