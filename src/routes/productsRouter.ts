import express from 'express';

import { productsController } from '../controllers/productsController';

const productsRouter = express.Router();

productsRouter.get('/products', productsController.getProducts);
productsRouter.post('/products', productsController.createProduct);

export { productsRouter };
