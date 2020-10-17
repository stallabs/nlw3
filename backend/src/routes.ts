import { Router } from "express";
import authMiddleware from './middlewares/authMiddleware'

import OrphanagesController from "./controllers/orphanagesController";
import UsersController from "./controllers/usersController";
import AuthController from "./controllers/authController";

import uploadConfig from "./config/upload";
import multer from "multer";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/orphanages", authMiddleware, upload.array("images"), OrphanagesController.create);
routes.get("/orphanages", authMiddleware, OrphanagesController.index);
routes.get("/orphanages/:id", authMiddleware, OrphanagesController.show);

routes.post("/users", UsersController.store)
routes.post("/auth", AuthController.authenticate)

export default routes;
