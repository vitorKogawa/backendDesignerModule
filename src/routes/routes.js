import { static, Router } from "express";
import { gameRouter } from "./game.routes";
import { nodeConnectionRoutes } from "./nodeConnection.routes";
import { labelRoutes } from "./label.routes";
import { gameNodeRoutes } from "./gameNode.routes";
// import { redisRouter } from './redis.routes'
import { resolve } from "path";

const routes = Router();

routes.use("/game", gameRouter);
routes.use("/connection", nodeConnectionRoutes);
routes.use("/label", labelRoutes);
routes.use("/node", gameNodeRoutes);
// routes.use(redisRouter);

routes.use(static(resolve(__dirname, "assets", "img")));

export { routes };
