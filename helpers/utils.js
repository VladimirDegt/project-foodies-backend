/**
 * Capitalizes the first letter of each word in a given string.
 * @param {string} str - The input string.
 * @return {string} - The transformed string with each word's first letter capitalized.
 */
export function firstLetterToCapital(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Processes a recipe object to include the ingredients' details.
 * @param recipe
 * @returns {*&{ingredients: {ingredient: {img: *, name: *, _id: *, desc: *}, measure: *}[]}}
 */
export const processRecipe = recipe => {
  const ingredients = recipe.ingredients.map(ingredient => ({
    ingredient: {
      _id: ingredient.id._id,
      name: ingredient.id.name,
      desc: ingredient.id.desc,
      img: ingredient.id.img,
    },
    measure: ingredient.measure,
  }));

  return {
    ...recipe.toObject(),
    ingredients,
  };
};
