import { Router } from "express";
import imageController from "../controllers/ImageController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, imageController.store);

export default router;
