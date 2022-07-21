import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import User from "../models/User";
import Event from "../models/Event";
import Image from "../models/Image";

const models = [User, Event, Image];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models)
);
