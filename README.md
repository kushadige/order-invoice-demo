# Order-Invoice Demo Project

## Overview

This project is a demonstration of an order-invoice system using modern technologies and patterns. It showcases the implementation of asynchronous order-invoice operations using the outbox message pattern, along with robust logging, database management, and containerization.

## Technologies Used

- [Bun](https://bun.sh/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Key Features

1. **Asynchronous Order-Invoice Operations**: Utilizes RabbitMQ for handling asynchronous processing of orders and invoices.
2. **Outbox Message Pattern**: Implements the outbox pattern for reliable message publishing and processing.
3. **Logging**: Logging system for tracking application events and errors.
4. **Database Management**: Uses Prisma ORM with PostgreSQL for data handling and migrations.
5. **Containerization**: Docker and Docker Compose for easy deployment and scaling.

## Project Structure

```
├── docker-compose.yml
├── invoice-service
│   ├── Dockerfile
│   ├── Makefile
│   ├── README.md
│   ├── bun.lockb
│   ├── entrypoint.sh
│   ├── package.json
│   ├── prisma
│   │   └── schema.prisma
│   ├── src
│   │   ├── config
│   │   │   ├── env.ts
│   │   │   └── messaging.ts
│   │   ├── controllers
│   │   │   └── invoice.controller.ts
│   │   ├── index.ts
│   │   ├── interfaces
│   │   │   ├── message-broker.ts
│   │   │   └── outbox.interface.ts
│   │   ├── lib
│   │   │   ├── axios.ts
│   │   │   ├── broker.ts
│   │   │   ├── logger.ts
│   │   │   ├── prisma.ts
│   │   │   └── rabbitmq-broker.ts
│   │   ├── middlewares
│   │   │   ├── _index.ts
│   │   │   ├── exception.middleware.ts
│   │   │   └── logger.middleware.ts
│   │   ├── models
│   │   │   └── index.ts
│   │   ├── routes
│   │   │   ├── _index.ts
│   │   │   └── invoice.routes.ts
│   │   ├── schemas
│   │   │   └── invoice.schemas.ts
│   │   └── services
│   │       ├── index.ts
│   │       ├── invoices
│   │       │   ├── _index.ts
│   │       │   ├── create-invoice.service.ts
│   │       │   ├── delete-invoice.service.ts
│   │       │   ├── invoice.service.ts
│   │       │   ├── payment-invoice.service.ts
│   │       │   ├── query-invoice.service.ts
│   │       │   └── update-invoice.service.ts
│   │       └── messaging
│   │           ├── _index.ts
│   │           ├── invoice-message.consumer.ts
│   │           ├── invoice-message.publisher.ts
│   │           └── order-message.consumer.ts
│   └── tsconfig.json
├── order-service
│   ├── Dockerfile
│   ├── Makefile
│   ├── README.md
│   ├── bun.lockb
│   ├── entrypoint.sh
│   ├── package.json
│   ├── prisma
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src
│   │   ├── config
│   │   │   ├── env.ts
│   │   │   └── messaging.ts
│   │   ├── controllers
│   │   │   ├── order.controller.ts
│   │   │   └── product.controller.ts
│   │   ├── factories
│   │   │   └── product.factory.ts
│   │   ├── index.ts
│   │   ├── interfaces
│   │   │   └── message-broker.ts
│   │   ├── lib
│   │   │   ├── broker.ts
│   │   │   ├── logger.ts
│   │   │   ├── prisma.ts
│   │   │   └── rabbitmq-broker.ts
│   │   ├── middlewares
│   │   │   ├── _index.ts
│   │   │   ├── exception.middleware.ts
│   │   │   └── logger.middleware.ts
│   │   ├── models
│   │   │   └── index.ts
│   │   ├── routes
│   │   │   ├── _index.ts
│   │   │   ├── order.routes.ts
│   │   │   └── product.routes.ts
│   │   ├── schemas
│   │   │   ├── order.schemas.ts
│   │   │   └── product.schemas.ts
│   │   └── services
│   │       ├── index.ts
│   │       ├── messaging
│   │       │   ├── _index.ts
│   │       │   ├── order-message.consumer.ts
│   │       │   └── order-message.publisher.ts
│   │       ├── orders
│   │       │   ├── _index.ts
│   │       │   ├── create-order.service.ts
│   │       │   ├── delete-order.service.ts
│   │       │   ├── order-outbox.service.ts
│   │       │   ├── order.service.ts
│   │       │   ├── query-order.service.ts
│   │       │   └── update-order.service.ts
│   │       ├── outbox
│   │       │   └── outbox.service.ts
│   │       └── products
│   │           ├── _index.ts
│   │           ├── create-product.service.ts
│   │           ├── product.service.ts
│   │           └── query-product.service.ts
│   └── tsconfig.json
```

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/kushadige/order-invoice-demo.git
   cd order-invoice-demo
   ```

2. Start the application using Docker Compose:
   ```
   docker-compose up --build
   ```

## Usage

1. Create an order by sending a POST request to order-service.
2. View the order and invoice data in the database.
3. Check the logs to see the order and invoice processing. (also check outbox message processing in database)
4. View the RabbitMQ management console to see the message queues.
5. Stop the application using `Ctrl+C` and remove the containers using `docker-compose down`.

## Outbox Message Pattern

This project implements the outbox message pattern to ensure reliable message publishing. Here's a brief overview of how it works:

1. When an order is created, it's stored in the database along with a corresponding outbox message.
2. A separate process periodically checks for unpublished outbox messages.
3. Unpublished messages are sent to RabbitMQ and marked as published in the database.
4. If message publishing fails, it will be retried in the next processing cycle.

## Database Schema

- `Order`: Stores order information
- `Invoice`: Stores invoice data related to orders
- `Product`:
- `OutboxMessage`: Stores messages for the outbox pattern

## API Documentation

### Create Order (order-service)

- **BASE_URL**: `http://localhost:3001`
- **Endpoint**: `/api/orders`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "product_codes": [
      "PRD-0001",
      "PRD-0001",
      "PRD-0001",
      "PRD-0002",
      "PRD-0002"
    ]
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order created successfully",
    "order": {
      "orderId": "ORD-0004",
      "products": [
        {
          "id": 1,
          "code": "PRD-0001",
          "name": "Unbranded Steel Tuna",
          "price": 907.99,
          "tax": 10.65,
          "discount": null,
          "stock": 7
        },
        {
          "id": 2,
          "code": "PRD-0002",
          "name": "Modern Granite Bacon",
          "price": 356.99,
          "tax": 0.45,
          "discount": null,
          "stock": 2
        }
      ],
      "totalAmount": 1363.28739,
      "totalTaxAmount": 98.30739,
      "totalDiscountAmount": 0,
      "orderDate": "2024-10-20T19:44:05.028Z"
    }
  }
  ```
- **Curl**:
  ```bash
  curl -X POST http://localhost:3001/api/orders -H "Content-Type: application/json" -d '{"product_codes": ["PRD-0001", "PRD-0001", "PRD-0001", "PRD-0002", "PRD-0002"]}'
  ```

### Order Outbox (order-service)

- **BASE_URL**: `http://localhost:3001`
- **Endpoint**: `/api/orders/outbox`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 3,
      "message": "{\"orderId\":\"ORD-0003\",\"products\":[{\"id\":1,\"code\":\"PRD-0001\",\"name\":\"Unbranded Steel Tuna\",\"price\":907.99,\"tax\":10.65,\"discount\":null,\"stock\":10},{\"id\":2,\"code\":\"PRD-0002\",\"name\":\"Modern Granite Bacon\",\"price\":356.99,\"tax\":0.45,\"discount\":null,\"stock\":4}],\"totalAmount\":1363.28739,\"totalTaxAmount\":98.30739,\"totalDiscountAmount\":0,\"orderDate\":\"2024-10-20T19:42:15.739Z\"}",
      "type": "order",
      "createdAt": "2024-10-20T19:42:15.744Z",
      "status": "COMPLETED",
      "attempts": 0
    },
    {
      "id": 4,
      "message": "{\"orderId\":\"ORD-0004\",\"products\":[{\"id\":1,\"code\":\"PRD-0001\",\"name\":\"Unbranded Steel Tuna\",\"price\":907.99,\"tax\":10.65,\"discount\":null,\"stock\":7},{\"id\":2,\"code\":\"PRD-0002\",\"name\":\"Modern Granite Bacon\",\"price\":356.99,\"tax\":0.45,\"discount\":null,\"stock\":2}],\"totalAmount\":1363.28739,\"totalTaxAmount\":98.30739,\"totalDiscountAmount\":0,\"orderDate\":\"2024-10-20T19:44:05.028Z\"}",
      "type": "order",
      "createdAt": "2024-10-20T19:44:05.031Z",
      "status": "IN_PROGRESS",
      "attempts": 0
    }
  ]
  ```
- **Curl**:
  ```bash
  curl -X GET http://localhost:3001/api/orders/outbox
  ```

### Get Products (order-service)

- **BASE_URL**: `http://localhost:3001`
- **Endpoint**: `/api/products`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "code": "PRD-0001",
      "name": "Unbranded Steel Tuna",
      "price": 907.99,
      "tax": 10.65,
      "discount": null,
      "stock": 4
    },
    {
      "id": 2,
      "code": "PRD-0002",
      "name": "Modern Granite Bacon",
      "price": 356.99,
      "tax": 0.45,
      "discount": null,
      "stock": 0
    }
  ]
  ```
- **Curl**:
  ```bash
  curl -X GET http://localhost:3001/api/products
  ```

### Get Orders (order-service)

- **BASE_URL**: `http://localhost:3001`
- **Endpoint**: `/api/orders`
- **Method**: `GET`
- **Response**:
  ```json
  [
    {
      "id": 1,
      "orderId": "ORD-0001",
      "totalAmount": 300.070979,
      "orderDate": "2024-10-20T19:33:34.315Z",
      "invoiceId": null
    },
    {
      "id": 2,
      "orderId": "ORD-0002",
      "totalAmount": 667.1550249999999,
      "orderDate": "2024-10-20T19:41:28.914Z",
      "invoiceId": null
    }
  ]
  ```
- **Curl**:
  ```bash
  curl -X GET http://localhost:3001/api/orders
  ```

## Author

[oguzhankuslar](https://github.com/kushadige)
