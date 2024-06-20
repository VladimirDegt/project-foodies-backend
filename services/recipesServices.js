import Favorite from '../db/models/Favorite.js';
import Recipe from '../db/models/Recipe.js';
import { processRecipe } from '../helpers/utils.js';

export const listRecipes = async (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;
  const total = await countRecipeCreated(filter);
  let data = await Recipe.find(filter, fields, settings)
    .populate('owner', '_id name avatarURL email')
    .populate({
      path: 'ingredients.id',
      select: 'name desc img',
    });

  data = data.map(recipe => processRecipe(recipe));

  return {
    total,
    data,
  };
};

export const getRecipeById = async recipetId => {
  const recipe = await Recipe.findOne({ _id: recipetId })
    .populate('owner', '_id name avatarURL email')
    .populate({
      path: 'ingredients.id',
      select: 'name desc img',
    });

  return processRecipe(recipe);
};

export const removeRecipe = (recipeId, owner) => {
  return Recipe.findOneAndDelete({ _id: recipeId, owner });
};

export const addRecipe = async data => {
  let newRecipe = await Recipe.create(data);
  newRecipe = await Recipe.findById(newRecipe._id).populate(
    'ingredients.id',
    'name desc img'
  );

  return processRecipe(newRecipe);
};

export const addFavoriteRecipe = (recipeId, userId) => {
  return Favorite.create({ recipe: recipeId, user: userId });
};

export const removeFavoriteRecipe = (recipeId, userId) => {
  return Favorite.findOneAndDelete({ recipe: recipeId, user: userId });
};

export const removeFavoriteRecipes = recipeId =>
  Favorite.deleteMany({ recipe: recipeId });

export const getMyFavoriteRecipe = async (search = {}) => {
  const { filter = {}, fields = '', settings = {} } = search;

  const total = await countRecipeFavorite(filter);
  const data = await Favorite.find(filter, fields, settings).populate('recipe');
  return { total, data };
};

export const getAllFavoriteRecipe = async (skip, limit) => {
  const total = await Favorite.distinct('recipe').then(
    uniqueRecipes => uniqueRecipes.length
  );

  const data = await Favorite.aggregate([
    {
      $group: {
        _id: '$recipe',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
    {
      $lookup: {
        from: 'recipes',
        localField: '_id',
        foreignField: '_id',
        as: 'recipe',
      },
    },
    {
      $unwind: '$recipe',
    },
    {
      $lookup: {
        from: 'users',
        localField: 'recipe.owner',
        foreignField: '_id',
        as: 'recipe.owner',
      },
    },
    {
      $unwind: '$recipe.owner',
    },
    {
      $project: {
        _id: 0,
        recipe: 1,
        count: 1,
        owner: 1,
      },
    },
    {
      $unset: ['recipe.owner.followers', 'recipe.owner.following'],
    },
  ]);

  return { total, data };
};

export const updateRecipe = (recipeId, owner, data) => {
  return Recipe.findOneAndUpdate({ _id: recipeId, owner }, data);
};

export const countRecipeCreated = async filter => Recipe.countDocuments(filter);

export const countRecipeFavorite = async filter =>
  Favorite.countDocuments(filter);
