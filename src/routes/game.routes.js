import { Router } from "express";
import { games_img_upload } from '../config/multer.config';
import gameController from "../controllers/gameController";

const gameRouter = new Router();

gameRouter.post(
  "/create",
  games_img_upload.single("image"),
  gameController.create
);
gameRouter.get("/", gameController.findAll);
gameRouter.get("/:id", gameController.findByID);
gameRouter.get("/userGames/:id", gameController.findUserGamesByID);
gameRouter.delete("/:id", gameController.deleteByID);

export { gameRouter };
