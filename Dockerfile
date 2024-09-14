FROM node:18-alpine as frontend-builder
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json* ./

ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

RUN npm install
COPY frontend/ ./
RUN yarn build

FROM node:18-alpine as backend-builder
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json* ./
RUN yarn install
COPY backend/ ./
RUN yarn build:ts

FROM nginx:alpine as frontend
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html

FROM node:18-alpine as backend
WORKDIR /app
COPY --from=backend-builder /app/backend ./
CMD ["sh", "-c", "yarn mi && sleep 5 && yarn dev"]

EXPOSE 3000
