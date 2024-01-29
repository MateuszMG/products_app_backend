import express from 'express';

import { productsController } from '../controllers/productsController';

const productsRouter = express.Router();

productsRouter.post('/products', productsController.createProduct);

export { productsRouter };
