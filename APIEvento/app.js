import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

import "./src/database";

import express from "express";

import userRoutes from "./src/routes/user";
import tokenRoutes from "./src/routes/token";

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
  }
}
export default new App().app;
