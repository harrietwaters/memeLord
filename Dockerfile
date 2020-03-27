# Build base
FROM node:12.16 as base
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

ENV CLIENT_TOKEN ${CLIENT_TOKEN}

WORKDIR /app
ENTRYPOINT ["/tini", "--"]

# start-watch
FROM base as start-watch

WORKDIR /app
COPY . .
RUN npm install --build-from-source
RUN npm run compile

# Release
FROM base as release
WORKDIR /app
COPY . .
RUN npm install --prod --build-from-source
RUN npm run compile
CMD ["node", "./dist/app.js"]