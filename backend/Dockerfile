# Промежуточный build контейнер
FROM node:alpine as builder

ARG PORT=80

# Рабочая директория
WORKDIR /usr/src/app

# Копируем файлы приложения в рабочую директорию
COPY . .

# Устанавливаем зависимости
RUN yarn install

# Собираем приложение
RUN yarn build

EXPOSE 80

# Запускаем сервер
CMD [ "node", "dist/main.js" ]