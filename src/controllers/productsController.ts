import { Request, Response } from 'express';

import {
  createProductValidation,
  editProductValidation,
  getProductValidation,
} from '../utils/validations/productValidations';

import { categoriesModel } from '../models/categoriesModel';
import { productModel } from '../models/productModel';

export const productsController = {
  getProduct: async (req: Request, res: Response) => {
    try {
      const { id } = await getProductValidation.validate(req.query);

      const product = productModel.getById(id);
      if (!product) throw new Error('Product not found');

      res.status(200).json({ product });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || 'Something went wrong' });
    }
  },

  getProducts: async (req: Request, res: Response) => {
    try {
      const products = productModel.getMany();

      res.status(200).json({ products });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || 'Something went wrong' });
    }
  },

  createProduct: async (req: Request, res: Response) => {
    try {
      const { category, ...rest } = await createProductValidation.validate(
        req.body,
      );

      const categories = categoriesModel.getCategories();
      if (!categories.includes(category))
        throw new Error('Cannot find category');

      const newProduct = productModel.create({ category, ...rest });

      res.status(201).json({ newProduct });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || 'Something went wrong' });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id, category, ...rest } = await editProductValidation.validate(
        req.body,
      );

      const exist = productModel.getById(id);
      if (!exist) throw new Error('Product not found');

      const categories = categoriesModel.getCategories();
      if (!categories.includes(category))
        throw new Error('Cannot find category');

      const updatedProduct = productModel.update({ id, category, ...rest });

      res.status(200).json({ updatedProduct });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || 'Something went wrong' });
    }
  },
};
