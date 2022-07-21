import multer from "multer";
import multerConfig from "../config/multerConfig";

import Image from "../models/Image";

const upload = multer(multerConfig).single("image");

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
        const image = await Image.create({ originalname, filename, event_id });
        return res.json(image);
      } catch (e) {
        return res.status(400).json({
          errors: ["Este evento não foi localizado no banco de dados"],
        });
      }
    });
  }
}
export default new ImageController();
