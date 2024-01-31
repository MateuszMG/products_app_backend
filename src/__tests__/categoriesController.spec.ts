import request from 'supertest';

import { app } from '../app';

jest.mock('../models/categoryModel', () => ({
  categoryModel: {
    getCategories: jest.fn(),
  },
}));

describe('Categories Controller', () => {
  it('should get categories successfully', async () => {
    const mockCategories = ['Category1', 'Category2'];

    (
      require('../models/categoryModel').categoryModel
        .getCategories as jest.Mock
    ).mockReturnValue(mockCategories);

    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ categories: mockCategories });
  });
});
