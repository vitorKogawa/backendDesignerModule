import { Router } from "express";
import multer from "./../config/multer.config";
import gameNodeController from "./../controllers/gameNodeController";

const gameNodeRoutes = new Router();

//POST ROUTES
gameNodeRoutes.post("/create", gameNodeController.create);

//GET ROUTES
gameNodeRoutes.get("/", gameNodeController.findAll);
gameNodeRoutes.get("/:id", gameNodeController.findByID);

//UPDATE ROUTES
gameNodeRoutes.put("/edit/nextnodex/:id", gameNodeController.editNextNodesByID);
gameNodeRoutes.put("/edit/position/:id", gameNodeController.editPositionByID);
gameNodeRoutes.put("/edit/labels/:id", gameNodeController.editLabelsByID);
gameNodeRoutes.put("/edit/colors/:id", gameNodeController.editColorsByID);
gameNodeRoutes.put("/edit/end/:id", gameNodeController.editEndByID);
gameNodeRoutes.put("/edit/start/:id", gameNodeController.editStartByID);
// gameNodeRoutes.put("/edit/image/:id", multer, gameNodeController.editImageByID);
gameNodeRoutes.put("/edit/compiled_content/:id",gameNodeController.editCompiledContentByID);
gameNodeRoutes.put("/edit/:id", gameNodeController.editByID);
gameNodeRoutes.put("/edit/form/:id", gameNodeController.editFormByID);

//DELETE ROUTES
gameNodeRoutes.delete("/delete/:id", gameNodeController.deleteByID);

export { gameNodeRoutes };
