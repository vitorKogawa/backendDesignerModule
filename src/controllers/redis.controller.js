import { redisConfig } from "./../config/redis.config";

class RedisController {
    sendMessage = (request, response) => {
        redisConfig.publisher.publish(
            "topic-analytics",
            JSON.stringify(request.body)
        );
        response.send("Publishing an Event using Redis");
    };
}

export default new RedisController();
