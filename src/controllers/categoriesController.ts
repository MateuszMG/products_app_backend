import { NextFunction, Request, Response } from 'express';

import { categoryModel } from '../models/categoryModel';

export const categoriesController = {
  getCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = categoryModel.getCategories();

      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  },
};
