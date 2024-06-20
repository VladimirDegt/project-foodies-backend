import ctrlWrapper from '../decorators/ctrlWrapper.js';
import { getAllIngredients } from '../services/ingredientsServices.js';

const getIngredients = async (req, res, next) => {
  const result = await getAllIngredients();
  res.json(result);
};

export default {
  getIngredients: ctrlWrapper(getIngredients),
};
