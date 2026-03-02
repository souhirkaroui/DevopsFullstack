# Étape 1 : Build Angular
FROM node:18 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration production

# Étape 2 : Nginx
FROM nginx:alpine

# Copier TOUT le dossier dist (plus sûr)
COPY --from=build /app/dist/ /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
