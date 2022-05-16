import { Router } from "express";
import playerConfigController from "./../controllers/playerConfigController";

const playerConfigRoute = Router();

playerConfigRoute.post("/create", playerConfigController.create);
playerConfigRoute.get("/:id", playerConfigController.find);
playerConfigRoute.put("/:id", playerConfigController.update);
playerConfigRoute.delete("/:id", playerConfigController.remove);

export { playerConfigRoute };