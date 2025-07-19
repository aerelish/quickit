# use Node base image
FROM node:22-slim@sha256:c26e3d817a783016e1927a576b12bb262ebdaa9a4338e11ed2f7b31d557289b5 AS base

# set working directory
WORKDIR /server

# copy only package files first (for caching)
COPY package*.json ./

# install dependencies
RUN npm install

# copy the rest of your app source
COPY . .

# generate the Prisma client
RUN npx prisma generate

# expose port 3000
EXPOSE 3000

# start the server
CMD npx prisma migrate deploy && npm start
