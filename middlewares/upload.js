import multer from 'multer';
import path from 'path';

import HttpError from '../helpers/HttpError.js';

const destination = path.resolve('tmp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${req.user.email}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 10,
};

const supportedFormats = ['jpeg', 'jpg', 'png', 'bmp', 'tiff', 'gif'];

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split('.').pop().toLowerCase();
  if (!supportedFormats.includes(extension)) {
    return callback(HttpError(400, `Unsupported file type: .${extension}`));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
