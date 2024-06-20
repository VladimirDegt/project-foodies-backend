import Area from '../db/models/Area.js';

export const getAllAreas = () => Area.find();
