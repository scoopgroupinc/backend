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
ARG DB_TYPE
ARG DB_DATABASE
ARG DB_HOST
ARG DB_USERNAME
ARG DB_PORT
ARG DB_PASSWORD
ARG DB_SSL_CA_CERT
ARG JWT_SECRET
ARG JWT_EXPIRES_IN
ARG PORT
ARG BE_FILE_SERVER_URL

# Print environment variables during build
RUN echo "DB_TYPE: $DB_TYPE" && \
    echo "DB_DATABASE: $DB_DATABASE" && \
    echo "DB_HOST: $DB_HOST" && \
    echo "DB_USERNAME: $DB_USERNAME" && \
    echo "DB_PORT: $DB_PORT" && \
    echo "DB_PASSWORD: $DB_PASSWORD" && \
    echo "DB_SSL_CA_CERT: $DB_SSL_CA_CERT" && \
    echo "JWT_SECRET: $JWT_SECRET" && \
    echo "JWT_EXPIRES_IN: $JWT_EXPIRES_IN" && \
    echo "PORT: $PORT" && \
    echo "BE_FILE_SERVER_URL: $BE_FILE_SERVER_URL"

# Set environment variables
ENV DB_TYPE=$DB_TYPE
ENV DB_DATABASE=$DB_DATABASE
ENV DB_HOST=$DB_HOST
ENV DB_USERNAME=$DB_USERNAME
ENV DB_PORT=$DB_PORT
ENV DB_SSL_CA_CERT=$DB_SSL_CA_CERT
ENV DB_PASSWORD=$DB_PASSWORD
ENV JWT_SECRET=$JWT_SECRET
ENV JWT_EXPIRES_IN=$JWT_EXPIRES_IN
ENV PORT=$PORT
ENV BE_FILE_SERVER_URL=$BE_FILE_SERVER_URL

# Build the application
RUN yarn build

# Expose a port if your application needs to listen on a specific port
EXPOSE $PORT

# Define the command to start your Node.js application
CMD [ "yarn", "start:prod" ]
