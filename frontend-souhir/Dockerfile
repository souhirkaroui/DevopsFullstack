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
COPY frontend-souhir/default.conf /etc/nginx/conf.d/default.conf  # <--- corrigé
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
