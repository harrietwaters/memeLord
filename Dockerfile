FROM node:12 AS builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12
WORKDIR /app
COPY --from=builder /app ./
ENV CLIENT_TOKEN "Njg3NzU0NjY0NjkwNzEyNjgz.Xn6nYA.TfvN11_vkFWUMk4vzr-Ua1ozrgY"
RUN npm run typeorm:migrate
CMD ["npm", "run", "start:prod"]
