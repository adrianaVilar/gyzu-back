import { Router } from "express";
import eventController from "../controllers/EventController";
import loginRequired from "../middlewares/loginRequired";

const router = new Router();

router.post("/", loginRequired, eventController.store);
router.put("/:id", loginRequired, eventController.update);
router.get("/", eventController.index); // Mostrar
router.get("/:id", eventController.show); // Mostrar por ID
router.delete("/:id", loginRequired, eventController.delete);

export default router;
