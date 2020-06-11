FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12
WORKDIR /app
COPY --from=builder /app ./
RUN npm run typeorm:migrate
CMD ["npm", "run", "start:prod"]
