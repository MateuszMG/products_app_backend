import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from './config/config';
import bodyParser from 'body-parser';

const app = express();

app.use(helmet());
app.use(cors({ origin: config.WEBSITE_URLS }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.disable('x-powered-by');

export { app };
