# Използваме малък образ с Node.js
FROM node:18-alpine

# Създаваме работна папка
WORKDIR /usr/src/app

# Копираме само package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Инсталираме зависимости
RUN npm install

# Копираме всички файлове на проекта
COPY . .

# Отваряме порт, на който Vite слуша
EXPOSE 5173

# Стартираме Vite Dev Server, явно подаваме host=0.0.0.0 за достъп отвън
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
