import { clerkClient } from '@clerk/express';
import { UserController } from './user.controller';

const userController = new UserController(clerkClient);

export { userController };
