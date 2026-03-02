# Étape 1 : Build Angular
FROM node:18 AS build
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Build Angular en prod
RUN npm run build --prod

# Étape 2 : Nginx
FROM nginx:alpine

# Copier les fichiers buildés
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Copier le fichier de configuration Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Exposer le port
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
