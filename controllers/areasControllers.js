import ctrlWrapper from '../decorators/ctrlWrapper.js';
import * as areasServices from '../services/areasServices.js';

const getAreas = async (req, res, next) => {
  const result = await areasServices.getAllAreas();
  res.json(result);
};

export default {
  getAreas: ctrlWrapper(getAreas),
};
