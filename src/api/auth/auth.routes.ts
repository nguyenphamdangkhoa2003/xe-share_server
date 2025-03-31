import { Router } from 'express';
import { authController } from './auth.module';
import { requireAuth } from '@clerk/express';
import { config } from '../../config/app.config';

const authRoutes = Router();
// authRoutes.use(
//   requireAuth({
//     signInUrl: config.CLERK_SIGN_IN_URL,
//   }),
// );
authRoutes.get('/users', authController.getAll);
authRoutes.post('/users', authController.Create);
export default authRoutes;
