FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /home/weon

COPY ["package-lock.json", "package.json", "./"]

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "start" ]