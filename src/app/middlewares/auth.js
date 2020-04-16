import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';
import errorMessages from '../constants/ErrorMessages';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Validando se o token foi informado no header
  if (!authHeader) {
    return res.status(401).json({ error: errorMessages.token_not_sended });
  }

  // Retirando o prefixo "Bearer" do token
  const [, token] = authHeader.split(' ');

  try {
    // Decodificando o token caso seja válido
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // Adicionando o id e o nome do usuário a requisição
    req.userId = decoded.id;
    req.userName = decoded.name;

    return next();
  } catch (error) {
    return res.status(401).json({ error: errorMessages.token_invalid });
  }
};
