import express from 'express';
import recipesControllers from '../controllers/recipesControllers.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import validateRecipeBody from '../decorators/validateRecipeBody.js';
import validateBody from '../decorators/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';
import {
  createRecipeSchema,
  favoriteRecipe,
} from '../schemas/recipesSchemas.js';

const recipesRouter = express.Router();

recipesRouter.get('/', recipesControllers.getRecipesByFilter);

recipesRouter.post(
  '/',
  authenticate,
  upload.single('thumb'),
  isEmptyBody,
  validateRecipeBody(createRecipeSchema),
  recipesControllers.addRecipe
);

recipesRouter.get(
  '/myrecipes/favorites',
  authenticate,
  recipesControllers.getMyFavoriteRecipe
);

recipesRouter.get(
  '/myrecipes/:userId',
  authenticate,
  recipesControllers.getRecipesFromUser
);

recipesRouter.post(
  '/favorites',
  authenticate,
  isEmptyBody,
  validateBody(favoriteRecipe),
  recipesControllers.addFavoriteRecipe
);

recipesRouter.delete(
  '/favorites',
  authenticate,
  isEmptyBody,
  validateBody(favoriteRecipe),
  recipesControllers.removeFavoriteRecipe
);

recipesRouter.get('/favorites', recipesControllers.getAllFavoriteRecipe);

recipesRouter.get('/:id', isValidId, recipesControllers.getOneRecipe);

recipesRouter.delete(
  '/:id',
  isValidId,
  authenticate,
  recipesControllers.removeRecipe
);

export default recipesRouter;
