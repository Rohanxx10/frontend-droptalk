# Step 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
# If CRA, use /app/build instead of /app/dist

EXPOSE 5713

CMD ["nginx", "-g", "daemon off;"]
