import { Router } from "express";
import attributesController from "./../controllers/attributesController";

const attributeRoute = Router();

attributeRoute.post("/create", attributesController.create);
attributeRoute.get("/:id", attributesController.findByID);
attributeRoute.put("/:id", attributesController.update);
attributeRoute.delete("/:id", attributesController.remove);

export { attributeRoute };
