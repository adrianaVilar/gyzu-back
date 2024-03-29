"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerConfig = require('../config/multerConfig'); var _multerConfig2 = _interopRequireDefault(_multerConfig);

var _Image = require('../models/Image'); var _Image2 = _interopRequireDefault(_Image);

const upload = _multer2.default.call(void 0, _multerConfig2.default).single("image");

class ImageController {
  // criar
  async store(req, res) {
    return upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          error: ["ERRO"],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { event_id } = req.body;
        const image = await _Image2.default.create({ originalname, filename, event_id });
        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ["Este evento não foi localizado no banco de dados"],
        });
      }
    });
  }
}
exports. default = new ImageController();
