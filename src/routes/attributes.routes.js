import { Router } from "express";
import attributesController from "./../controllers/attributesController";

const attributesRoutes = Router();

attributesRoutes.post("/create", attributesController.create);
attributesRoutes.get("/:id", attributesController.findByID);
attributesRoutes.put("/:id", attributesController.update);
attributesRoutes.delete("/:id", attributesController.remove);

export { attributesRoutes };
