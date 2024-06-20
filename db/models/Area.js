import { Schema, model } from 'mongoose';

const areaSchema = new Schema(
  {
    name: String,
  },
  { versionKey: false, timestamps: false }
);

const Area = model('area', areaSchema);

export default Area;
