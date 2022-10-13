import { Router } from "express";
import rewardsController from '../controllers/rewardsController';

const rewardsRoute = Router();

rewardsRoute.post("/create", rewardsController.create);
rewardsRoute.get("/:id", rewardsController.find);
rewardsRoute.put("/:id", rewardsController.update);
rewardsRoute.delete("/:id", rewardsController.remove);

export { rewardsRoute };
