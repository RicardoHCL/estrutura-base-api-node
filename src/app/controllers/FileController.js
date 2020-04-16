import File from '../models/File';
import User from '../models/User';

class FileController {
  async create(req, res) {
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({ name, path });

    // Após salvar o avatar, faz uma consulta do usuário
    const user = await User.findByPk(req.userId);

    // Caso o usuário esteja alterando o avatar, irá ser deletado a imagem atual
    if (user.avatar_id) {
      const oldAvatar = await File.findByPk(user.avatar_id);

      await oldAvatar.destroy();
    }

    // Atualiza a imagem do avatar do usuário
    await user.update({
      avatar_id: file.id,
    });

    return res.json(file);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.userId);

    // Caso o usuário de fato tenha uma imagem ele deleta
    if (user.avatar_id) {
      const avatar = await File.findByPk(user.avatar_id);

      await avatar.destroy();
    }

    return res.status(204).json();
  }
}

export default new FileController();
