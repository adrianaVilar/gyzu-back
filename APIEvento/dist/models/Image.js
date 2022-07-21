"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Image extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: " ",
          validate: {
            notEmpty: {
              msg: "Este campo não pode ser vazio",
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Este campo não pode ser vazio",
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return `${_appConfig2.default.url}/images/${this.getDataValue("filename")}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Event, { foreignKey: "event_id" });
  }
} exports.default = Image;
