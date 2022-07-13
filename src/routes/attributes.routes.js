import { Router } from "express";
import { attributes_img_upload } from './../config/multer.config'
import attributesController from "./../controllers/attributesController";

const attributeRoute = Router();

attributeRoute.post("/create", attributes_img_upload.single("icon"), attributesController.create);
attributeRoute.get("/:id", attributesController.findByID);
attributeRoute.put("/:id", attributesController.update);
attributeRoute.delete("/:id", attributesController.remove);

export { attributeRoute };
