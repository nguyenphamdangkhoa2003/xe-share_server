import { Router } from 'express';
import { userController } from './user.module';
import { upload } from '../../config/multer.config';
const userRoutes = Router();
userRoutes.get('/users/:id', userController.getUserById);
userRoutes.get('/users', userController.getAll);
userRoutes.post('/users', userController.createUser);
userRoutes.patch('/users/:id', userController.updateUser);
userRoutes.delete('/users/:id', userController.deleteUserProfile);
userRoutes.post(
  '/users/:id/profile_image',
  upload.single('file'),
  userController.setUserProfileImage,
);
userRoutes.post(`/users/:id/toggle-ban`, userController.toggleBanUser);
export default userRoutes;
