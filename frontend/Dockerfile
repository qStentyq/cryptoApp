FROM node:alpine as build


COPY package.json package.json

RUN npm install --legacy-peer-deps

COPY . .

RUN npm install esbuild@^0.21.5


RUN npm run build

FROM nginx:stable-alpine 

COPY --from=build /dist /usr/share/nginx/html 
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]