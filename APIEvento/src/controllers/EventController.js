import Event from "../models/Event";
import Image from "../models/Image";

class EventController {
  // mostrar todos
  async index(req, res) {
    const events = await Event.findAll({
      attributes: [
        "id",
        "nome_evento",
        "categoria",
        "data_hora",
        "organizador",
      ],
      // Ordem de apresentação decrescente:
      order: [
        ["id", "DESC"],
        [Image, "id", "DESC"],
      ],
      include: {
        model: Image,
        attributes: ["url", "filename"],
      },
    });
    res.json(events);
  }

  // mostrar por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Por favor, insira um ID válido"],
        });
      }

      const event = await Event.findByPk(id, {
        attributes: [
          "id",
          "nome_evento",
          "categoria",
          "data_hora",
          "organizador",
        ],
        // Ordem de apresentação decrescente:
        order: [
          ["id", "DESC"],
          [Image, "id", "DESC"],
        ],
        include: {
          model: Image,
          attributes: ["url", "filename"],
        },
      });

      if (!event) {
        return res.status(400).json({
          errors: ["Este evento não foi encontrado na base de dados"],
        });
      }

      return res.json(event);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // criar
  async store(req, res) {
    try {
      const event = await Event.create(req.body);
      return res.json(event);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // deletar
  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Por favor, insira um ID válido"],
        });
      }
      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(400).json({
          errors: ["Este evento não foi encontrado na base de dados"],
        });
      }

      await event.destroy();
      return res.json({
        apagado: true,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // atualizar
  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Por favor, insira um ID válido"],
        });
      }

      const event = await Event.findByPk(id);

      if (!event) {
        return res.status(400).json({
          errors: ["Este evento não foi encontrado na base de dados"],
        });
      }

      const eventAtualizado = await event.update(req.body);
      return res.json(eventAtualizado);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}
export default new EventController();
