import ctrlWrapper from '../decorators/ctrlWrapper.js';
import * as testimonialsServices from '../services/testimonialsServices.js';

const getTestimonials = async (req, res, next) => {
  const result = await testimonialsServices.getAllTestimonials();
  res.json(result);
};

export default {
  getTestimonials: ctrlWrapper(getTestimonials),
};
