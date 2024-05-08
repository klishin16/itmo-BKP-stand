# Промежуточный build контейнер
FROM node:alpine as builder

ENV PORT=80

# Рабочая директория
WORKDIR /usr/src/app

# Копируем файлы приложения в рабочую директорию
COPY . .

# Устанавливаем зависимости
RUN yarn install

# Собираем приложение
RUN yarn build

FROM node:alpine as deploy

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 80

# Запускаем сервер
CMD [ "node", "dist/main.js" ]
