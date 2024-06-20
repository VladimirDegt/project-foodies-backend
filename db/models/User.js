import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSettings } from './hooks.js';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    token: {
      type: String,
    },
  },
  { versionKey: false }
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSettings);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;
