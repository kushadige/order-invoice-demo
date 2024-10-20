#!/bin/sh

# wait-for-rabbitmq.sh
while ! nc -z rabbitmq 5672; do
  echo "Waiting for RabbitMQ..."
  sleep 2
done

# Wait for the database to be ready
until pg_isready -h invoice-db -U invoice_user; do
  echo "Waiting for invoice-db..."
  sleep 2
done

# Generate Prisma client and apply migrations
bunx prisma generate
bunx prisma migrate dev --name init --create-only
bunx prisma migrate deploy

# Start the application
exec "$@"
