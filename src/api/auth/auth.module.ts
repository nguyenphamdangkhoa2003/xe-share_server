import { clerkClient } from '@clerk/express';
import { AuthController } from './auth.controller';

const authController = new AuthController(clerkClient);

export { authController };
