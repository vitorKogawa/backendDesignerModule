import { Router } from "express";
import eventsController from '../controllers/eventsController';

const eventsRoute = Router();

eventsRoute.post("/create", eventsController.create);
eventsRoute.get("/", eventsController.findAll);
eventsRoute.get("/:id", eventsController.findByID);
eventsRoute.put("/:id", eventsController.update);
eventsRoute.delete("/:id", eventsController.remove);

export { eventsRoute };
