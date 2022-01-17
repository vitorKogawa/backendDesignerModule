import { Router } from "express";
import { redisConfig } from "./../config/redis.config";
import redisController from "./../controllers/redis.controller";

const redisRouter = Router();

redisRouter.post("/message/send", redisController.sendMessage);

redisConfig.subscriber.on("message", (channel, message) => {
    console.log(`Received data: ${message}`);
});

redisConfig.subscriber.subscribe("topic-analytics");

export { redisRouter };
