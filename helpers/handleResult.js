import HttpError from './HttpError.js';

const handleResult = result => {
  if (!result || result.length === 0) {
    throw HttpError(404, 'Not found');
  }
};

export default handleResult;
