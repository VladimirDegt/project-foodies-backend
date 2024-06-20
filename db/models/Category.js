import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: String,
  },
  { versionKey: false, timestamps: false }
);

const Category = model('category', categorySchema);

export default Category;
