import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import { errorMessages } from '../utils/errors/errorMessages';
import {
  createProductValidation,
  deleteProductValidation,
  editProductValidation,
  getProductValidation,
} from '../utils/validations/productValidations';

import { categoryModel } from '../models/categoryModel';
import { productModel } from '../models/productModel';

export const productsController = {
  getProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await getProductValidation.validate(req.query);

      const product = productModel.getById(id);
      if (!product)
        throw createHttpError(404, { message: errorMessages.productNotFound });

      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  },

  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = productModel.getMany();

      res.status(200).json({ products });
    } catch (error) {
      next(error);
    }
  },

  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { category, ...rest } = await createProductValidation.validate(
        req.body,
      );

      const categories = categoryModel.getCategories();
      if (!categories.includes(category))
        throw createHttpError(404, { message: errorMessages.categoryNotFound });

      const newProduct = productModel.create({ category, ...rest });

      res.status(201).json({ newProduct });
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, category, ...rest } = await editProductValidation.validate(
        req.body,
      );

      const categories = categoryModel.getCategories();
      if (!categories.includes(category))
        throw createHttpError(404, { message: errorMessages.categoryNotFound });

      const updatedProduct = productModel.update({ id, category, ...rest });
      if (!updatedProduct)
        throw createHttpError(404, { message: errorMessages.productNotFound });

      res.status(200).json({ updatedProduct });
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = await deleteProductValidation.validate(req.query);

      const exist = productModel.getById(id);
      if (!exist)
        throw createHttpError(404, { message: errorMessages.productNotFound });

      productModel.delete(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  },
};
