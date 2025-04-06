import { ClerkClient } from '@clerk/express';
import { asyncController } from '../../middlewares/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { HTTPSTATUS } from '../../config/http.config';

export class EmailController {
  private clerkClient: ClerkClient;
  constructor(clerkClient: ClerkClient) {
    this.clerkClient = clerkClient;
  }

  public deleteEmailAddress = asyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const email = await this.clerkClient.emailAddresses.deleteEmailAddress(req.params.id);
      return res.status(HTTPSTATUS.OK).json({
        message: 'Deleted successful',
        data: email,
      });
    },
  );

  public updateEmailAddress = asyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const rs = await this.clerkClient.emailAddresses.updateEmailAddress(req.params.id, req.body);
      return res.status(HTTPSTATUS.OK).json({
        message: 'Updated successful',
        data: rs,
      });
    },
  );

  public addEmailAddress = asyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const rs = await this.clerkClient.emailAddresses.createEmailAddress(req.body);
      return res.status(HTTPSTATUS.CREATED).json({
        message: 'Created successful',
        data: rs,
      });
    },
  );
}
