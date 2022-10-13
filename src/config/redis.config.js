import { createClient } from "redis";
import "./env.config";

const publisher = createClient({
  port: process.env.REDIS_PUBLISHER_PORT,
  host: process.env.REDIS_PUBLISHER_HOST,
  password: process.env.REDIS_PUBLISHER_PASSWORD,
});

const subscriber = createClient({
  port: process.env.REDIS_SUBSCRIBER_PORT,
  host: process.env.REDIS_SUBSCRIBER_HOST,
  password: process.env.REDIS_SUBSCRIBER_PASSWORD,
});

const redisConfig = {
  publisher,
  subscriber,
};

export { redisConfig };
