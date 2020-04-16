import User from '../models/User';

class UserController {
  async create(req, res) {
    // Verificação de unicidade do email
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).json({ error: 'O email informado está em uso.' });
    }

    const { id, name, email, phone } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
    });
  }

  async listOne(req, res) {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'phone'],
    });

    return res.json(user);
  }
}

export default new UserController();
