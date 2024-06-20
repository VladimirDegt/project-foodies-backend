import HttpError from '../helpers/HttpError.js';
import { getAllIngredients } from '../services/ingredientsServices.js';
import { getAllCategories } from '../services/categoriesServices.js';
import { getAllAreas } from '../services/areasServices.js';

const validateRecipeBody = schema => {
  return async (req, _, next) => {
    const arrayIngredients = [];
    const { ingredients, category, area } = req.body;

    const ingredientsDB = await getAllIngredients();
    const categoriesDB = await getAllCategories();
    const areasDB = await getAllAreas();

    const availableIngredients = ingredientsDB.map(({ _id }) => {
      return _id.toString();
    });
    const availableCategories = categoriesDB.map(({ name }) => {
      return name;
    });
    const availableAreas = areasDB.map(({ name }) => {
      return name;
    });

    //   validate ingredients
    if (!Array.isArray(ingredients)) {
      arrayIngredients.push(...JSON.parse(ingredients));
      arrayIngredients.forEach(({ id }) => {
        if (!availableIngredients.includes(id)) {
          next(HttpError(409, `Ingredient with id ${id} not found`));
        }
      });
      req.body.ingredients = arrayIngredients;
    }

    //   validate category
    if (!availableCategories.includes(category)) {
      next(
        HttpError(409, `Category ${category} not found or doesn't available`)
      );
    }

    //   validate area
    if (!availableAreas.includes(area)) {
      next(HttpError(409, `Area ${area} not found or doesn't available`));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

export default validateRecipeBody;
