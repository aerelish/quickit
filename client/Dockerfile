# stage 1
# build stage
FROM node:22-slim@sha256:c26e3d817a783016e1927a576b12bb262ebdaa9a4338e11ed2f7b31d557289b5 AS builder

# set working directory for docker, like hey do the commands here
WORKDIR /client

# copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the source code
COPY . .

# Build the app
RUN npm run build

# stage2 
# serve with Nginx
FROM nginx:stable-alpine-perl@sha256:fff07cc3a741c20b2b1e4bbc3bbd6d3c84859e5116fce7858d3d176542800c10 AS runner

# remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# copy build output from previous step
COPY --from=builder /client/dist /usr/share/nginx/html

# Optional: replace default nginx config (if needed)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
