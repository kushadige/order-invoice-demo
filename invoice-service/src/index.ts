import express from "express";
import routes from "./routes/_index";
import { PORT } from "./config/env";
import { exceptionMiddleware, loggerMiddleware } from "./middlewares/_index";
import { messageBroker } from "./lib/broker";
import { orderConsumer } from "./services";

const app = express();

app.use(express.json());
app.use(loggerMiddleware);
app.use("/", routes);
app.use(exceptionMiddleware);

const reconnectToRabbitMQ = async () => {
  try {
    const channel = await messageBroker.connect();

    // Start consumers
    orderConsumer.consumeOrders();

    channel.on("close", () => {
      console.log("Channel closed, attempting to reconnect...");
      setTimeout(reconnectToRabbitMQ, 5000); // try to reconnect after 5 seconds if connection closed
    });
  } catch (error) {
    console.error("Error connecting to RabbitMQ", error);
    setTimeout(reconnectToRabbitMQ, 5000); // try to reconnect after 5 seconds if connection failed
  }
};

reconnectToRabbitMQ();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
