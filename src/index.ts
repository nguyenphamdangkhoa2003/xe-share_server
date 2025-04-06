import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { config } from './config/app.config';
import connectionDatabase from './database/database';
import { errorhandle } from './middlewares/errorHandle';
import { HTTPSTATUS } from './config/http.config';
import { asyncController } from './middlewares/asyncHandler';
import { clerkMiddleware } from '@clerk/express';
import emailRouter from './api/email/email.routes';
import userRoutes from './api/users/user.routes';
// Load environment variables

// Initialize Express app
const app: Application = express();
const BASE_PATH = config.BASE_PATH;
// 1. Database Connection

// 2.Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.APP_ORGIN || '*',
    credentials: true,
  }),
);

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });
// app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(compression());

if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(clerkMiddleware());
//3. Routes
app.get(
  '/api/health',
  asyncController(async (req: Request, res: Response) => {
    res.status(HTTPSTATUS.OK).json({
      status: 'success',
      message: 'XeShare API is running 🚀',
    });
  }),
);

app.use(`${config.BASE_PATH}`, userRoutes);
app.use(`${config.BASE_PATH}`, emailRouter);
app.listen(config.PORT, async () => {
  console.log(`Server listenting on port: ${config.PORT}`);
  connectionDatabase();
});
// 5. Global Error Handler
app.use(errorhandle);
// 6. Export app for testing and server startup
export default app;
