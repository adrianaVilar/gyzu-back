import { Router } from "express";
import userController from "../controllers/UserController";

import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", userController.store); // Esse não precisa de login, pq o usuario precisa acessar para criar conta
router.put("/", loginRequired, userController.update); // Precisa de login
router.delete("/", loginRequired, userController.delete); // Precisa de login

export default router;
