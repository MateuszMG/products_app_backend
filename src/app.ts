import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { config } from './config/config';

import { categoriesRouter } from './routes/categoriesRouter';
import { productsRouter } from './routes/productsRouter';

import { errorHandler } from './middleware/errorHandler';
import { appLimiter } from './middleware/rateLimiter';

const app = express();

app.use(helmet());
app.use(cors({ origin: JSON.parse(config.WEBSITE_URLS) }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(appLimiter);

app.use('/api', categoriesRouter);
app.use('/api', productsRouter);

app.use(errorHandler);

export { app };
