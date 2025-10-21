# # Use the latest LTS version of Node.js
# FROM node:23-alpine

# # Set the working directory inside the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of your application files
# COPY . .

# # Expose the port Vite uses by default
# EXPOSE 5173

# # Start the Vite development server
# CMD ["npm", "run", "dev", "--", "--host"]


# Production build (uncomment to use)
# Build React app
FROM node:23-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve with Nginx
FROM nginx:alpine

# Copy custom Nginx config into container
COPY nginx/react.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

