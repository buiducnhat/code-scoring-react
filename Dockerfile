FROM node:lts

# Create app directory
WORKDIR /usr/src/app/code-scoring/frontend

# Install dependencies
COPY . /usr/src/app/code-scoring/frontend

# Install packages
RUN apt update && \
  apt install nginx -y && \
  cp .nginx/code-scoring.conf /etc/nginx/sites-available && \
  ln -s /etc/nginx/sites-available/code-scoring-react.conf /etc/nginx/sites-enabled && \
  /etc/init.d/nginx restart

# Install dependencies
RUN yarn

# Build react app
RUN yarn build

# Copy built project to html
RUN cp -a /usr/src/app/code-scoring/frontend/build/. /var/www/html

# Environment variables to run app (can set when run docker)
ENV PORT = 3000 \
  REACT_APP_SERVER_URL = "http://18.221.118.238:8888/api/v1" \
  REACT_APP_TINY_API_KEY = "zs14qq8sdh2fn9zwavbh8emh6kh572kdjx5nmyrzoogq620k"

# Expose port for accessing
EXPOSE 80