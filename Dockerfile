# Build base
# load resources images
FROM node:12.16.2 as base
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /app
ENTRYPOINT ["/tini", "--"]

COPY ./.eslintrc.json ./.eslintignore ./jest.config.js ./.sequelizerc ./package.json ./package-lock.json ./tsconfig.json ./tsconfig.prod.json ./
COPY ./images ./images
COPY ./types ./types
COPY ./src  ./src
COPY ./db  ./db

# compile
FROM base as compile-prod
WORKDIR /app

RUN npm install --prod --silent
RUN npm run compile:prod

# release
FROM compile-prod as release
WORKDIR /app
CMD ["node", "./dist/app.js"]
