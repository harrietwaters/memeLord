FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

FROM node:12
WORKDIR /app
COPY --from=builder /app ./
RUN npm ci --production --silent
EXPOSE 3000
CMD ["node", "dist/main"]
