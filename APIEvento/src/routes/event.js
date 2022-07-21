import { Router } from "express";
import eventController from "../controllers/EventController";

const router = new Router();

router.post("/", eventController.store);
router.get("/", eventController.index); // Mostrar
router.get("/:id", eventController.show); // Mostrar por ID
router.delete("/:id", eventController.delete);

export default router;
