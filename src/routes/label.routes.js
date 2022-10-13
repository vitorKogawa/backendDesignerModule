import { Router } from "express";
import labelController from '../controllers/labelController';

const labelRoutes = new Router();

labelRoutes.post("/create", labelController.create);
labelRoutes.get("/", labelController.findAll);

export { labelRoutes };
