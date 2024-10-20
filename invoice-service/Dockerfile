# Pull the Bun image from Docker Hub
FROM oven/bun:1

# Setting Working Directory
WORKDIR /app

# Install netcat, postgresql-client, make
RUN apt-get update && apt-get install -y netcat
RUN apt-get update && apt-get install -y postgresql-client
RUN apt-get update && apt-get install -y make

# Copying only package.json
COPY ./package.json ./bun.lockb ./

# Install Dependencies
RUN bun install

# Copy rest of the code to container 
COPY . /app

# Copy entrypoint.sh to container
COPY ./entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000

# Run the app
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["bun", "run", "start"]
