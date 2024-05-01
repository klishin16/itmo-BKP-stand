# Промежуточный build контейнер
FROM node:alpine as builder

# Рабочая директория
WORKDIR /usr/src/app

# Копируем файлы приложения в рабочую директорию
COPY . .

# Устанавливаем зависимости
RUN yarn install

# Собираем приложение
RUN yarn build

# Запускаем сервер
CMD [ "node", "dist/main.js" ]