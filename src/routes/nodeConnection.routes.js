import { Router } from "express";
import nodeConnectionController from '../controllers/nodeConnectionController';

const nodeConnectionRoutes = new Router();

nodeConnectionRoutes.post("/create", nodeConnectionController.create);
nodeConnectionRoutes.get("/", nodeConnectionController.findAll);
nodeConnectionRoutes.get("/:id", nodeConnectionController.findByID);
nodeConnectionRoutes.get(
  '/current/:id',
  nodeConnectionController.findCurrentByID,
);

export { nodeConnectionRoutes };
