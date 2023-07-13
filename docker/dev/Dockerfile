# Specify the base image with Node.js version
FROM node:16.15.0

# Set the working directory in the container
WORKDIR ./../../

# Copy the package.json and yarn.lock files to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application files to the working directory
COPY . .

# Copy .env file to the container
COPY .env.development .env

# Build the application
RUN yarn build

# Expose a port if your application needs to listen on a specific port
EXPOSE 3000

# Define the command to start your Node.js application
CMD [ "yarn", "start:prod" ]
