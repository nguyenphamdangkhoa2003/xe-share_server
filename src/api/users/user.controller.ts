import { ClerkClient } from '@clerk/express';
import { asyncController } from '../../middlewares/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { HTTPSTATUS } from '../../config/http.config';
export class UserController {
  private clerkClient: ClerkClient;
  constructor(clerkClient: ClerkClient) {
    this.clerkClient = clerkClient;
  }

  public getAll = asyncController(async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.clerkClient.users.getUserList(req.query);
    return res.status(HTTPSTATUS.OK).json(users);
  });

  public createUser = asyncController(async (req: Request, res: Response, next: NextFunction) => {
    const userData = req.body;
    const result = await this.clerkClient.users.createUser(userData);
    res.status(HTTPSTATUS.CREATED).json({
      message: 'User created',
      data: result,
    });
  });

  public getUserById = asyncController(async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.clerkClient.users.getUser(req.params.id);
    if (!result) {
      return res.status(HTTPSTATUS.NOT_FOUND).json({ message: 'User not found in Clerk' });
    }
    return res.status(HTTPSTATUS.OK).json(result);
  });

  public updateUser = asyncController(async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.clerkClient.users.updateUser(req.params.id, req.body);
    res.status(HTTPSTATUS.OK).json({
      message: 'User Updated',
      data: result,
    });
  });

  public deleteUserProfile = asyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const result = await this.clerkClient.users.deleteUserProfileImage(req.params.id);
      res.status(HTTPSTATUS.OK).json({
        message: 'Deleted',
        data: result,
      });
    },
  );

  public setUserProfileImage = asyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      if (!req.file) {
        return res.status(HTTPSTATUS.BAD_REQUEST).json({ message: 'No file uploaded' });
      }
      const fileBlob = new Blob([req.file.buffer], { type: req.file.mimetype });
      const result = await this.clerkClient.users.updateUserProfileImage(req.params.id, {
        file: fileBlob,
      });

      return res.status(HTTPSTATUS.OK).json({
        message: 'Profile image updated successfully',
        data: result,
      });
    },
  );

  public toggleBanUser = asyncController(
    async (req: Request, res: Response, next: NextFunction) => {
      const endpoint = req.body.endpoint;
      let result;
      if (endpoint == 'ban') result = await this.clerkClient.users.banUser(req.params.id);
      else result = await this.clerkClient.users.unbanUser(req.params.id);
      return res.status(HTTPSTATUS.OK).json({
        message: 'successful',
      });
    },
  );

  public deleteUser = asyncController(async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.clerkClient.users.deleteUser(req.params.id);
    return res.status(HTTPSTATUS.OK).json({
      message: 'Deleted',
    });
  });
}
