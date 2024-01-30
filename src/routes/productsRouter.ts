import express from 'express';

import { productsController } from '../controllers/productsController';

const productsRouter = express.Router();

productsRouter.get('/products', productsController.getProducts);

productsRouter
  .route('/product')
  .get(productsController.getProduct)
  .post(productsController.createProduct)
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export { productsRouter };
