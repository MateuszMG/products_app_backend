import express from 'express';

import { categoriesController } from '../controllers/categoriesController';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories', categoriesController.getCategories);

export { categoriesRouter };
