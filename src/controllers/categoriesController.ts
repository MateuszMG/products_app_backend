import { NextFunction, Request, Response } from 'express';

import { categoriesModel } from '../models/categoriesModel';

export const categoriesController = {
  getCategories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = categoriesModel.getCategories();

      res.status(200).json({ categories });
    } catch (error) {
      next(error);
    }
  },
};
