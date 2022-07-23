"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Event extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome_evento: {
          type: _sequelize2.default.STRING,
          defaultValue: " ",
          unique: {
            args: true,
            msg: "Por favor, digite um nome único para o evento",
          },
          set(value) {
            this.setDataValue("nome_evento", value.toUpperCase());
          },
          validate: {
            len: {
              args: [3, 50],
              msg: "O nome do evento precisa ter entre 3 e 50 caracteres",
            },
          },
        },
        categoria: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "A categoria do evento deve ter entre 3 e 255 caracteres",
            },
          },
        },
        data_hora: {
          type: _sequelize2.default.DATE,
          allowNull: false,
          validate: {
            isDate: {
              args: true,
              msg: "Por favor, insira uma data válida",
            },
            isAfter: {
              args: new Date().toDateString(),
              msg: "Insira uma data no futuro",
            },
          },
        },
        organizador: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "O nome do organizador do evento deve ter entre 3 e 255 caracteres",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }

  // Dizer que o evento tem fotos, com a FK event_id
  static associate(models) {
    this.hasMany(models.Image, { foreignKey: "event_id" });
  }
} exports.default = Event;
