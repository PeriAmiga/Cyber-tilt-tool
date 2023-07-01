FROM node:alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./code/package.json /app/package.json
COPY ./code/package-lock.json /app/package-lock.json
RUN npm install
COPY ./code /app
RUN npm run build

## nginx
FROM nginx:1.23.2
COPY --from=build /app/build /usr/share/nginx/html
COPY ./ssl/MPT.crt /etc/nginx/ssl/MPT.crt
COPY ./ssl/MPT.key /etc/nginx/ssl/MPT.key
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]