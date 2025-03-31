import { getEnv } from '../common/utils/get-env';
const appConfig = () => ({
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  APP_ORGIN: getEnv('APP_ORIGIN', '*'),
  PORT: getEnv('PORT', '8000'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  MONGO_URI: getEnv('MONGO_URI', 'localhost'),
  CLERK_SIGN_IN_URL: getEnv('CLERK_SIGN_IN_URL'),
});

export const config = appConfig();
