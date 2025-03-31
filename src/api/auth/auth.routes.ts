import { Router } from 'express';
import { authController } from './auth.module';

const authRoutes = Router();

authRoutes.get('/users', authController.getAll);

export default authRoutes;
