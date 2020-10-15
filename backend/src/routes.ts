import { Router } from "express";
import OrphanagesController from "./controllers/orphanagesController";

import uploadConfig from "./config/upload";
import multer from "multer";

const routes = Router();
const upload = multer(uploadConfig);

routes.post("/orphanages", upload.array("images"), OrphanagesController.create);
routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);

export default routes;
