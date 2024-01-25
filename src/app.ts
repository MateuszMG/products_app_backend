import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { config } from './config/config';

import { categoriesRouter } from './routes/categoriesRouter';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.WEBSITE_URLS }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use('/', categoriesRouter);

export { app };
