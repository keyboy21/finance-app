FROM node:alpine
WORKDIR /app
COPY . .
COPY package*.json ./
RUN npm install
RUN npm install @rollup/rollup-linux-x64-musl
EXPOSE 3000
CMD ["npm", "run", "dev"]