import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteProfile,
  getProfile,
  updateProfile,
  updateUserAvatar,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
const router = Router();
router.get('/users/profile', authenticate, ctrlWrapper(getProfile));
router.patch('/users/profile', authenticate, ctrlWrapper(updateProfile));
router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);
router.delete('/users/profile', authenticate, ctrlWrapper(deleteProfile));
export default router;
