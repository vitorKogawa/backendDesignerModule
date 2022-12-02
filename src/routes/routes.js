import express, { Router } from "express";
import { resolve } from "path";
import { gameRouter } from "./game.routes";
import { nodeConnectionRoutes } from "./nodeConnection.routes";
import { labelRoutes } from "./label.routes";
import { gameNodeRoutes } from "./gameNode.routes";
import { attributeRoute } from "./attributes.routes";
import { eventsRoute } from "./events.routes";
import { playerConfigRoute } from "./playerConfig.routes";
import { rewardsRoute } from "./rewards.routes";

const routes = Router();

routes.use("/game", gameRouter);
routes.use("/connection", nodeConnectionRoutes);
routes.use("/label", labelRoutes);
routes.use("/node", gameNodeRoutes);
routes.use("/attributes", attributeRoute);
routes.use("/events", eventsRoute);
routes.use("/playerConfig", playerConfigRoute);
routes.use("/rewards", rewardsRoute);

routes.use(
    "/home/card/img/attributes/",
    express.static(resolve(__dirname, "../assets/img/attributes/"))
);

routes.use(
    "/home/card/img/games/",
    express.static(resolve(__dirname, "../assets/img/games/"))
);

routes.post("/login", (request, response) =>
    response.status(200).json({ message: "ok" })
);

const baseDir = resolve(__dirname, "..", "build");
routes.use(express.static(baseDir));
routes.get("*", (request, response) =>
    response.sendFile("index.html", { root: baseDir })
);

export { routes };
