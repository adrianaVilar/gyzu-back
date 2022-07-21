"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// Retorna um valor aleatório para que o nome do arquivo nunca seja igual
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

exports. default = {
  // Para filtrar os arquivos que chegam pelo tipo (mais seguro que pela extensão)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(
        new _multer2.default.MulterError("Arquivo precisa ser png, jpg ou jpeg.")
      );
    }

    return cb(null, true);
  },
  // Para salvar a imagem em uma pasta do servidor
  storage: _multer2.default.diskStorage({
    // Local para salvar
    destination: (req, file, cb) => {
      // Esse primeiro parametro receberia um erro se houvesse
      cb(null, _path.resolve.call(void 0, __dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      // Extname: pega a extensão do arquivo
      cb(null, `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`);
    },
  }),
};
