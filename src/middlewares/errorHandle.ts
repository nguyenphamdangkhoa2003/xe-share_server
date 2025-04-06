import { ErrorRequestHandler, Request, Response } from 'express';
import { HTTPSTATUS } from '../config/http.config';
import { AppError } from '../common/utils/AppError';
export const errorhandle: ErrorRequestHandler = (error, req: Request, res: Response, next): any => {
  console.error('Error occured on PATH: ', req.path, error);

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format, please check your request body',
      error: error?.message,
    });
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      erroCode: error.errorCode,
    });
  }
  if (error.clerkError) {
    console.log({
      message: error.errors[0].longMessage,
    });
    return res.status(error.status).json({
      message: error.errors[0].longMessage,
    });
  }
  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: error?.message || 'Unknow error occuered',
  });
};
