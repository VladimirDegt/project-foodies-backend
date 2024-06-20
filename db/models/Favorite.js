import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const favoriteRecipeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'User   is required'],
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: 'recipe',
      required: [true, 'Recipe is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

favoriteRecipeSchema.index({ user: 1, recipe: 1 }, { unique: true });

favoriteRecipeSchema.post('save', handleSaveError);

favoriteRecipeSchema.pre('findOneAndUpdate', setUpdateSettings);

favoriteRecipeSchema.post('findOneAndUpdate', handleSaveError);

const Favorite = model('favorite', favoriteRecipeSchema);

export default Favorite;
