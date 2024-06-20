import Ingredient from '../db/models/Ingredient.js';

export const getAllIngredients = () => Ingredient.find();
