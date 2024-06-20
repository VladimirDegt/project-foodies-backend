import * as recipesService from '../services/recipesServices.js';
import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpError from '../helpers/HttpError.js';
import handleResult from '../helpers/handleResult.js';
import cloudinary from '../helpers/cloudinary.js';
import fs from 'fs/promises';
import { firstLetterToCapital } from '../helpers/utils.js';
import Ingredient from '../db/models/Ingredient.js';

const getRecipesByFilter = async (req, res) => {
  const { category, ingredients, area, page = 1, limit = 12 } = req.query;
  const skip = (page - 1) * limit;
  const filter = {};

  if (category) filter.category = firstLetterToCapital(category);

  if (ingredients) {
    const ingredientsArray = ingredients
      .split(',')
      .map(name => firstLetterToCapital(name.trim()));
    const ingredientsDocs = await Ingredient.find(
      {
        name: { $in: ingredientsArray },
      },
      '_id'
    );

    const ingredientsIds = ingredientsDocs.map(doc => doc._id);

    filter.ingredients = {
      $all: ingredientsIds.map(id => ({ $elemMatch: { id } })),
    };
  }

  if (area) filter.area = firstLetterToCapital(area);

  const fields = '-createdAt -updatedAt';
  const settings = { skip, limit };

  const { total, data } = await recipesService.listRecipes({
    filter,
    fields,
    settings,
  });

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

const getOneRecipe = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.getRecipeById(id);
  handleResult(result);
  res.json({ data: result });
};

const getRecipesFromUser = async (req, res) => {
  console.log(req.params);
  const { userId: owner } = req.params;
  console.log(owner);
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const filter = { owner };
  const fields = '-createdAt -updatedAt';
  const settings = { skip, limit };

  const { total, data } = await recipesService.listRecipes({
    filter,
    fields,
    settings,
  });

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

const addRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  let path;
  if (req.file) {
    path = req.file.path;
  }

  try {
    if (path) {
      const { url: thumb } = await cloudinary.uploader.upload(path, {
        folder: 'recipes',
      });

      const newRecipe = await recipesService.addRecipe({
        ...req.body,
        owner,
        thumb,
      });

      return res.status(201).json(newRecipe);
    }

    const newRecipe = await recipesService.addRecipe({
      ...req.body,
      owner,
    });

    res.status(201).json({ data: newRecipe });
  } catch (err) {
    throw HttpError(400, err.message);
  } finally {
    if (path) {
      await fs.unlink(path);
    }
  }
};

const removeRecipe = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await recipesService.removeRecipe(id, owner);
  await recipesService.removeFavoriteRecipes(id);

  handleResult(result);

  res.json(result);
};

const addFavoriteRecipe = async (req, res) => {
  const { _id: user } = req.user;
  const { recipe } = req.body;
  const { total: isFavorite } = await recipesService.getMyFavoriteRecipe({
    filter: { user, recipe },
  });
  const isRecipe = await recipesService.getRecipeById(recipe);
  if (!isRecipe) {
    throw HttpError(404, 'Recipe not found');
  }

  if (isFavorite) {
    throw HttpError(409, 'Recipe is already in favorites');
  }

  const result = await recipesService.addFavoriteRecipe(recipe, user);

  res.status(201).json(result);
};

const removeFavoriteRecipe = async (req, res) => {
  const { _id: user } = req.user;

  const { recipe } = req.body;

  const result = await recipesService.removeFavoriteRecipe(recipe, user);
  handleResult(result);

  res.json(result);
};

const getAllFavoriteRecipe = async (req, res) => {
  let { page = 1, limit = 4 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;

  const { total, data } = await recipesService.getAllFavoriteRecipe(
    skip,
    limit
  );

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

const getMyFavoriteRecipe = async (req, res) => {
  const { _id: user } = req.user;
  let { page = 1, limit = 10 } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const skip = (page - 1) * limit;
  const filter = { user };

  const fields = '-createdAt -updatedAt -user';
  const settings = { skip, limit };

  const { total, data } = await recipesService.getMyFavoriteRecipe({
    filter,
    fields,
    settings,
  });

  const totalPages = Math.ceil(total / limit);

  res.json({ total, currentPage: page, totalPages, data });
};

export default {
  getRecipesByFilter: ctrlWrapper(getRecipesByFilter),
  getOneRecipe: ctrlWrapper(getOneRecipe),
  getRecipesFromUser: ctrlWrapper(getRecipesFromUser),
  addRecipe: ctrlWrapper(addRecipe),
  removeRecipe: ctrlWrapper(removeRecipe),
  addFavoriteRecipe: ctrlWrapper(addFavoriteRecipe),
  getAllFavoriteRecipe: ctrlWrapper(getAllFavoriteRecipe),
  getMyFavoriteRecipe: ctrlWrapper(getMyFavoriteRecipe),
  removeFavoriteRecipe: ctrlWrapper(removeFavoriteRecipe),
};
