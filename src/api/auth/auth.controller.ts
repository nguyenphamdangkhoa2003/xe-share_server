import { ClerkClient } from '@clerk/express';
import { asyncController } from '../../middlewares/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { HTTPSTATUS } from '../../config/http.config';
export class AuthController {
  private clerkClient: ClerkClient;
  constructor(clerkClient: ClerkClient) {
    this.clerkClient = clerkClient;
  }

  public getAll = asyncController(async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.clerkClient.users.getUserList();
    return res.status(HTTPSTATUS.OK).json(users);
  });
}
