# Étape 1 : Build Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2 : Nginx
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf  # <-- fichier à la racine
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
