const requiredEnvVars = [
  "DATABASE_URL",
  "AMQP_URL",
  "PORT",
  "INVOICE_SERVICE_URL",
];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

export const DB_URL = process.env.DATABASE_URL;
export const AMQP_URL = process.env.AMQP_URL;
export const PORT = process.env.PORT || 3000;
