FROM ubuntu:latest
LABEL authors="NalinkaHeshan"
#use offcial node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# copy dependencies files
COPY package*.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
RUN npm run build

EXPOSE 3000

# Start the application
CMD ["npm", "start"]
