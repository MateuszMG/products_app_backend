import express from 'express';

import { productsController } from '../controllers/productsController';

const productsRouter = express.Router();

productsRouter.get('/products', productsController.getProducts);

productsRouter.get('/product', productsController.getProduct);
productsRouter.post('/product', productsController.createProduct);
productsRouter.put('/product', productsController.updateProduct);

export { productsRouter };
