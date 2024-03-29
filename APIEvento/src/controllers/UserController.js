import User from "../models/User";

class UserController {
  // Store/criate
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, name, email } = novoUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Index
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ["id", "name", "email"] });
      return res.json(users);
    } catch (e) {
      // retorna nulo pq se houver erro, foi o código que quebrou e ñ a pessoa que digitou errado
      return res.json(null);
    }
  }

  // Update
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ["O usuário não existe."],
        });
      }

      const novosDados = await user.update(req.body);
      const { id, name, email } = novosDados;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ["O usuário não existe."],
        });
      }

      await user.destroy();
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
