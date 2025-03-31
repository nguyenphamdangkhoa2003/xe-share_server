import { Request, Response, NextFunction } from 'express';

type AsyncControllerType = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const asyncController =
  (controller: AsyncControllerType): AsyncControllerType =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
