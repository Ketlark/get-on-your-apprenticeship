# build environment
FROM node:14.17.0-alpine
WORKDIR /app
COPY package*.json ./
COPY . .
RUN node ace build --production
ENV NODE_ENV=production PORT=3333 HOST=0.0.0.0 APP_KEY=raXorxnh3If81VSeM42UEsgP9FtIjIfc
EXPOSE ${PORT}

WORKDIR /app/build
RUN npm ci --production
CMD ["npm", "start"]
