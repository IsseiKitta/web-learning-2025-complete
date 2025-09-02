# --- 1. ビルドステージ ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# --- 2. プロダクションステージ ---
FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]