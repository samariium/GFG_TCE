FROM node:18-alpine

WORKDIR /app/backend

# Install backend dependencies
COPY backend/package.json ./
RUN npm install

# Copy backend API and frontend files into the same image
COPY backend/server.js ./server.js
WORKDIR /app
COPY frontend ./frontend

EXPOSE 3000

CMD ["node", "backend/server.js"]