import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

import "./database";

import express from "express";

import userRoutes from "./routes/user";
import tokenRoutes from "./routes/token";
import eventRoutes from "./routes/event";
import imageRoutes from "./routes/image";

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      "/images/",
      express.static(resolve(__dirname, "..", "uploads", "images"))
    );
  }

  routes() {
    this.app.use("/users/", userRoutes);
    this.app.use("/tokens/", tokenRoutes);
    this.app.use("/events/", eventRoutes);
    this.app.use("/images/", imageRoutes);
  }
}
export default new App().app;
