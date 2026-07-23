FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm test

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app /app
ENV PORT=3001
EXPOSE 3001
CMD ["node", "app.js"]