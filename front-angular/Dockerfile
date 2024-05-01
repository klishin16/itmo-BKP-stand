# Промежуточный build контейнер
FROM node:alpine as builder

#ENV VITE_BACKEND_URL=http://backend.local.dev

# Рабочая директория
WORKDIR /usr/src/app

# Копируем файлы приложения в рабочую директорию
COPY . .

# Устанавливаем зависимости
RUN yarn install

# Собираем приложение
RUN yarn build

# Nginx контейнер
FROM nginx:alpine as deploy
COPY --from=builder /usr/src/app/dist/front-angular/browser /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Открываем порт nginx
EXPOSE 80

# Запускаем nginx в daemon режиме
CMD ["nginx", "-g", "daemon off;"]
