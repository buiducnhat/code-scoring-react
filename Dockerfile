# Build stage
FROM node:14.17.0-alpine as build-stage
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /code-scoring/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]