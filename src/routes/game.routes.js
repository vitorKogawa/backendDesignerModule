import { Router } from "express";
import multer from './../config/multer.config'
import gameController from "../controllers/gameController";

const gameRouter = new Router();

gameRouter.post("/create", multer, gameController.create);
gameRouter.get("/", gameController.findAll);
gameRouter.get("/:id", gameController.findByID);
gameRouter.get("/userGames/:id", gameController.findUserGamesByID);

export { gameRouter };
