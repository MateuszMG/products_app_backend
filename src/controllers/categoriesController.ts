import { Request, Response } from 'express';

import { categoriesModel } from '../models/categoriesModel';

export const categoriesController = {
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = categoriesModel.getCategories();

      res.status(200).json({ categories });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: error?.message || 'Something went wrong' });
    }
  },
};
