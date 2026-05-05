# -------- BUILD --------
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# -------- RUNTIME --------
FROM node:22

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 3000

CMD ["node", "dist/src/main.js"]