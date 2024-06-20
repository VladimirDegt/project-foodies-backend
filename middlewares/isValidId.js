import { isValidObjectId } from 'mongoose';

import HttpError from '../helpers/HttpError.js';

const isValidId = (req, res, next) => {
  const { userId, id } = req.params;
  const idToCheck = id || userId;
  if (!isValidObjectId(idToCheck)) {
    return next(HttpError(404, `${idToCheck} not valid id`));
  }
  next();
};

export default isValidId;
