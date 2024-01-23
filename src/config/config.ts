import dotenv from 'dotenv';
import { cleanEnv, port } from 'envalid';
import { validateUrlsArray } from '../utils/validations/envValidations';

dotenv.config();

export const config = cleanEnv(process.env, {
  PORT: port(),

  WEBSITE_URLS: validateUrlsArray(),
});
