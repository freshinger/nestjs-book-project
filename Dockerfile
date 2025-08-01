FROM node:22 AS builder

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:22-alpine

# Only copy required files from builder stage
COPY --from=builder /dist ./dist
COPY --from=builder /package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000

CMD ["node","dist/main"]