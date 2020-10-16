import { Router } from "express";
import OrphanagesController from "./controllers/orphanagesController";
import UsersControllers from "./controllers/usersControllers";

import uploadConfig from "./config/upload";
import multer from "multer";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/orphanages", upload.array("images"), OrphanagesController.create);
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);

routes.post("/users", UsersControllers.store)

export default routes;
