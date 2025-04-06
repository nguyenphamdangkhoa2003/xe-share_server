import { Router } from 'express';
import { emailController } from './email.module';

const emailRouter = Router();
emailRouter.delete('/email/:id', emailController.deleteEmailAddress);
emailRouter.patch('/email/:id', emailController.updateEmailAddress);
emailRouter.post('/email', emailController.addEmailAddress);
export default emailRouter;
