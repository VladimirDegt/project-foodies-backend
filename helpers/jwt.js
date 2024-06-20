import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

export const createToken = payload =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

export const verifyToken = token => jwt.verify(token, JWT_SECRET);
