import multer from "multer";
import { extname, resolve } from "path";

// Retorna um valor aleatório para que o nome do arquivo nunca seja igual
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // Para filtrar os arquivos que chegam pelo tipo (mais seguro que pela extensão)
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(
        new multer.MulterError("Arquivo precisa ser png, jpg ou jpeg.")
      );
    }

    return cb(null, true);
  },
  // Para salvar a imagem em uma pasta do servidor
  storage: multer.diskStorage({
    // Local para salvar
    destination: (req, file, cb) => {
      // Esse primeiro parametro receberia um erro se houvesse
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      // Extname: pega a extensão do arquivo
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
