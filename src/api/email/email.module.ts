import { clerkClient } from '@clerk/express';
import { EmailController } from './email.controller';

const emailController = new EmailController(clerkClient);
export { emailController };
