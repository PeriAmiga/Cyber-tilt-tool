FROM node:alpine
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./code/package.json .
COPY ./code/package-lock.json .
RUN npm install
RUN npm cache clean --force

COPY ./code .
EXPOSE 3000

CMD ["npm", "run", "start"]