# Промежуточный build контейнер
FROM node:alpine as build

# Рабочая директория
WORKDIR /usr/src/app

# Копируем файлы приложения в рабочую директорию
COPY . .

# Устанавливаем зависимости
RUN yarn install

# Собираем приложение
RUN npm install react-scripts@3.0.1 -g
RUN yarn build

# Nginx контейнер
FROM nginx:alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Открываем порт nginx
EXPOSE 80

# Запускаем nginx в daemon режиме
CMD ["nginx", "-g", "daemon off;"]
