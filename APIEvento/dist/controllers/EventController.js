"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Event = require('../models/Event'); var _Event2 = _interopRequireDefault(_Event);
var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

class EventController {
  // mostrar todos
  async index(req, res) {
    const events = await _Event2.default.findAll({
      attributes: ["id", "event_name", "category", "date_time", "organizer"],
      // Ordem de apresentação decrescente:
      order: [
        ["id", "DESC"],
        [_Image2.default, "id", "DESC"],
      ],
      include: {
        model: _Image2.default,
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

      const event = await _Event2.default.findByPk(id, {
        attributes: [
          "id",
          "event_name".toUpperCase(),
          "category",
          "date_time",
          "organizer",
        ],
        // Ordem de apresentação decrescente:
        order: [
          ["id", "DESC"],
          [_Image2.default, "id", "DESC"],
        ],
        include: {
          model: _Image2.default,
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
      const event = await _Event2.default.create(req.body);
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
      const event = await _Event2.default.findByPk(id);

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

      const event = await _Event2.default.findByPk(id);

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
exports. default = new EventController();
