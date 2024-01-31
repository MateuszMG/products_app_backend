import request from 'supertest';

import { app } from '../app';

jest.mock('../models/categoryModel', () => ({
  categoryModel: {
    getCategories: jest.fn(),
  },
}));

jest.mock('../models/productModel', () => ({
  productModel: {
    getById: jest.fn(),
    getMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockProduct = {
  category: 'laptops',
  description: 'Default description v1',
  id: '1',
  name: 'Laptop 1',
  price: 456,
  quantity: 2,
  productionDate: '2015-12-12',
};

const mockProduct2 = {
  category: 'laptops',
  description: 'Default description v2',
  id: '2',
  name: 'Laptop 2',
  price: 1947,
  quantity: 20000,
  productionDate: '2015-11-11',
};

const mockProducts = [mockProduct, mockProduct2];

describe('ProductsController', () => {
  describe('validations', () => {
    describe('getProduct validation', () => {
      it.each(['1', 0, 1, '99'])('valid id includes %s', async (id) => {
        const res = await request(app).get('/api/product').query({ id });

        expect(res.body).toStrictEqual({ message: 'Product not found' });
      });

      it.each(['-', 'a', '@', '#', `NaN`, NaN, -1])(
        'invalid id includes %s',
        async (id) => {
          const res = await request(app).get('/api/product').query({ id });

          expect(res.body).toStrictEqual({ message: 'Id not found' });
        },
      );
    });

    describe('createProduct validation', () => {
      it('should validate createProduct request successfully', async () => {
        const mockProduct = {
          category: 'Category1',
          name: 'Product A',
          price: 10,
          quantity: 100,
          productionDate: '2022-01-01',
        };
        require('../models/categoryModel').categoryModel.getCategories.mockReturnValueOnce(
          [mockProduct.category],
        );
        require('../models/productModel').productModel.create.mockReturnValueOnce(
          mockProduct,
        );

        const res = await request(app).post('/api/product').send(mockProduct);

        expect(res.status).toBe(201);
      });

      it('should not validate createProduct request', async () => {
        const mockProduct = {
          category: 'Category1',
          name: 'Product A',
          price: 10,
          quantity: -100,
          productionDate: '2022-01-01',
        };
        require('../models/categoryModel').categoryModel.getCategories.mockReturnValueOnce(
          [mockProduct.category],
        );
        require('../models/productModel').productModel.create.mockReturnValueOnce(
          mockProduct,
        );

        const res = await request(app).post('/api/product').send(mockProduct);

        expect(res.body).toStrictEqual({
          message: 'Quantity must be at least 1',
        });
      });
    });

    describe('editProduct validation', () => {
      it('should validate editProduct request successfully', async () => {
        const mockUpdatedProduct = {
          id: '1',
          category: 'Category1',
          name: 'Updated Product A',
          price: 15,
          quantity: 150,
          productionDate: '2022-02-01',
        };
        require('../models/categoryModel').categoryModel.getCategories.mockReturnValueOnce(
          [mockUpdatedProduct.category],
        );
        require('../models/productModel').productModel.update.mockReturnValueOnce(
          mockUpdatedProduct,
        );

        const res = await request(app)
          .put('/api/product')
          .send(mockUpdatedProduct);

        expect(res.status).toBe(200);
      });

      it('should not validate editProduct request', async () => {
        const mockUpdatedProduct = {
          id: '1',
          category: '',
          name: 'Updated Product A',
          price: 15,
          quantity: 150,
          productionDate: '2022-02-01',
        };
        require('../models/categoryModel').categoryModel.getCategories.mockReturnValueOnce(
          [mockUpdatedProduct.category],
        );
        require('../models/productModel').productModel.update.mockReturnValueOnce(
          mockUpdatedProduct,
        );

        const res = await request(app)
          .put('/api/product')
          .send(mockUpdatedProduct);

        expect(res.body).toStrictEqual({ message: 'Category is required' });
      });
    });

    describe('deleteProduct validation', () => {
      it('should validate deleteProduct request successfully', async () => {
        require('../models/productModel').productModel.getById.mockReturnValueOnce(
          { id: '1' },
        );

        const res = await request(app)
          .delete('/api/product')
          .query({ id: '1' });

        expect(res.status).toBe(204);
      });
    });
  });

  describe('productsController.getById', () => {
    it('should get a product successfully', async () => {
      require('../models/productModel').productModel.getById.mockReturnValueOnce(
        mockProduct,
      );

      const res = await request(app)
        .get('/api/product')
        .query({ id: mockProduct.id });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ product: mockProduct });
    });
  });

  describe('productsController.getMany', () => {
    it('should get multiple products successfully', async () => {
      require('../models/productModel').productModel.getMany.mockReturnValueOnce(
        mockProducts,
      );

      const res = await request(app).get('/api/products');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ products: mockProducts });
    });
  });

  describe('productsController.create', () => {
    it('should create a product successfully', async () => {
      const { id, ...rest } = mockProduct;
      require('../models/productModel').productModel.create.mockReturnValueOnce(
        mockProduct,
      );
      require('../models/categoryModel').categoryModel.getCategories.mockReturnValue(
        [mockProduct.category],
      );

      const res = await request(app).post('/api/product').send(rest);

      expect(res.status).toBe(201);
      expect(res.body).toStrictEqual({ newProduct: mockProduct });
    });
  });

  describe('productsController.update', () => {
    it('should update a product successfully', async () => {
      require('../models/productModel').productModel.update.mockReturnValueOnce(
        mockProduct,
      );
      require('../models/categoryModel').categoryModel.getCategories.mockReturnValue(
        [mockProduct.category],
      );

      const res = await request(app).put('/api/product').send(mockProduct);

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual({ updatedProduct: mockProduct });
    });
  });

  describe('productsController.delete', () => {
    it('should delete a product successfully', async () => {
      require('../models/productModel').productModel.getById.mockReturnValueOnce(
        mockProduct,
      );

      const res = await request(app)
        .delete('/api/product')
        .query({ id: mockProduct.id });

      expect(res.status).toBe(204);
    });
  });
});
