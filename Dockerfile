# Build base
FROM node:12.16 as base
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /app
ENTRYPOINT ["/tini", "--"]

# start-watch
FROM base as start-watch

WORKDIR /app
COPY . .
RUN npm install
RUN npm run compile

# Release
FROM base as release
WORKDIR /app
COPY . .
RUN npm install --prod
CMD ["node", "./dist/app.js"]