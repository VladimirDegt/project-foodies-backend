import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { getAllCategories } from '../services/categoriesServices.js';

const getCategories = async (req, res, next) => {
  const result = await getAllCategories();
  res.json(result);
};

export default {
  getCategories: ctrlWrapper(getCategories),
};
