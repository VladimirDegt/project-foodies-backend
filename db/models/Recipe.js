import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const ingredientsToRecipeSchema = new Schema(
  {
    id: {
      type: String,
      ref: 'ingredient',
      required: [true, 'Ingredients is required'],
      alias: 'ingredient',
    },
    measure: {
      type: String,
      required: [true, 'Measure is required'],
    },
  },
  { _id: false }
);

const recipeSchema = new Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    area: { type: String, required: [true, 'Area is required'] },
    instructions: {
      type: String,
      required: [true, 'Instructions is required'],
    },
    description: { type: String, required: [true, 'Description is required'] },
    thumb: { type: String },
    time: { type: String, required: [true, 'Coocking time is required'] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    ingredients: [ingredientsToRecipeSchema],
  },
  { versionKey: false, timestamps: true }
);

recipeSchema.post('save', handleSaveError);

recipeSchema.pre('findOneAndUpdate', setUpdateSettings);

recipeSchema.post('findOneAndUpdate', handleSaveError);

const Recipe = model('recipe', recipeSchema);

export default Recipe;
