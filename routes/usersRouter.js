import express from 'express';
import authControllers from '../controllers/usersControllers.js';
import isEmptyBody from '../middlewares/isEmptyBody.js';
import authenticate from '../middlewares/authenticate.js';
import validateBody from '../decorators/validateBody.js';
import { userSignupSchema, userSigninSchema } from '../schemas/usersSchemas.js';
import isValidId from '../middlewares/isValidId.js';
import upload from '../middlewares/upload.js';
import isFilePresent from '../middlewares/isFilePresent.js';

const usersRouter = express.Router();

usersRouter.post(
  '/signup',
  isEmptyBody,
  validateBody(userSignupSchema),
  authControllers.signUp
);

usersRouter.post(
  '/signin',
  isEmptyBody,
  validateBody(userSigninSchema),
  authControllers.signIn
);

usersRouter.get('/current', authenticate, authControllers.getCurrent);

usersRouter.post('/signout', authenticate, authControllers.signOut);

usersRouter.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  isFilePresent,
  authControllers.updateAvatar
);

usersRouter.get(
  '/followers/:userId',
  authenticate,
  authControllers.getFollowers
);

usersRouter.get('/following', authenticate, authControllers.getFollowing);

usersRouter.post(
  '/follow/:userId',
  authenticate,
  isValidId,
  authControllers.followUser
);

usersRouter.delete(
  '/unfollow/:userId',
  authenticate,
  isValidId,
  authControllers.unfollowUser
);

usersRouter.get(
  '/details/:userId',
  authenticate,
  isValidId,
  authControllers.getUserDetails
);

export default usersRouter;
