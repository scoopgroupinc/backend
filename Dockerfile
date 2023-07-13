# Specify the base image with Node.js version
FROM node:16.15.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy the rest of the application files to the working directory
COPY . .

# Display the contents of the build context
RUN ls -a

# Build the application
ARG DB_DATABASE_PROD
ARG DB_HOST_PROD
ARG DB_USERNAME_PROD
ARG DB_PORT_PROD
ARG DB_PASSWORD_PROD
ARG JWT_SECRET_PROD
ARG PORT_PROD

# Set DB_DATABASE to the value of DB_DATABASE_PROD
ENV DB_DATABASE=${DB_DATABASE_PROD}
ENV DB_HOST=${DB_HOST_PROD}
ENV DB_USERNAME=${DB_USERNAME_PROD}
ENV DB_PORT=${DB_PORT_PROD}
ENV DB_PASSWORD=${DB_PASSWORD_PROD}
ENV JWT_SECRET=${JWT_SECRET_PROD}
ENV PORT=${PORT_PROD}

# Build the application
RUN yarn build

# Expose a port if your application needs to listen on a specific port
EXPOSE 3000

# Define the command to start your Node.js application
CMD [ "yarn", "start:prod" ]
