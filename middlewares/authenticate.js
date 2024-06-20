import HttpError from '../helpers/HttpError.js';
import * as usersServices from '../services/usersServices.js';
import jwt from 'jsonwebtoken';

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, 'Authorization header not found'));
  }

  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(401, 'Bearer not found'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const now = Math.floor(Date.now() / 1000);

    if (decoded.exp < now) {
      await usersServices.updateUser({ _id: decoded.id }, { token: null });
      return next(HttpError(401, 'Token expired. Please log in again.'));
    }

    const user = await usersServices.findUser({ _id: decoded.id });
    if (!user) {
      return next(HttpError(401, 'User not found'));
    }

    if (!user.token) {
      return next(HttpError(401, 'User signed out'));
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return next(HttpError(401, 'Token is invalid'));
    }
    return next(HttpError(401, error.message));
  }
};

export default authenticate;
