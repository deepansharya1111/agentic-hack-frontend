# Build Stage
FROM node:20-slim as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
FROM node:20-slim
RUN npm install -g serve
WORKDIR /app
COPY --from=builder /app/dist ./build
EXPOSE 8080
CMD ["serve", "-s", "build", "-l", "8080"]
