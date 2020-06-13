FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install --silent
COPY . .
RUN npm run build

FROM node:12
WORKDIR /app
COPY --from=builder /app ./
RUN npm install --prod --silent
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
