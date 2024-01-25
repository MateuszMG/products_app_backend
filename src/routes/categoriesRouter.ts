import express from 'express';

import { categoriesController } from '../controllers/categoriesController';

const categoriesRouter = express.Router();

categoriesRouter.post('/categories', categoriesController.getCategories);

export { categoriesRouter };
