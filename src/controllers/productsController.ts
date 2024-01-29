import { Request, Response } from 'express';

import { createProductValidation } from '../utils/validations/productValidations';

import { categoriesModel } from '../models/categoriesModel';
import { productModel } from '../models/productModel';

export const productsController = {
  getProducts: async (req: Request, res: Response) => {
    try {
      const products = productModel.getMany();

      res.status(201).json({ products });
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

      if (!categories.includes(category)) throw 'Cannot find category';

      const newProduct = productModel.create({ category, ...rest });

      res.status(201).json({ newProduct });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || 'Something went wrong' });
    }
  },
};
