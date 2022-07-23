import Sequelize, { Model } from "sequelize";

export default class Event extends Model {
  static init(sequelize) {
    super.init(
      {
        nome_evento: {
          type: Sequelize.STRING,
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
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "A categoria do evento deve ter entre 3 e 255 caracteres",
            },
          },
        },
        data_hora: {
          type: Sequelize.DATE,
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
          type: Sequelize.STRING,
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
}
