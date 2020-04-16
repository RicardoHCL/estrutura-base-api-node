import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';
import errorMessages from '../constants/ErrorMessages';

class SessionController {
  async create(req, res) {
    // Validação dos campos com o Yup
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: errorMessages.yup_validation_failed });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: errorMessages.user_not_found });
    }

    // Conferindo se a senha informada bate com a senha cadastrada
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: errorMessages.password_not_match });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
      // Gerando o payload do token jwt
      token: jwt.sign({ id, name }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
