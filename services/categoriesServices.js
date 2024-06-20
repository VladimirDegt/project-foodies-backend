import Category from '../db/models/Category.js';

export const getAllCategories = () => Category.find();
