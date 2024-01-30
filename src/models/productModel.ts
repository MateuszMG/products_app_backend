interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productionDate: string;
  category: string;
}

const dbProducts: Map<string, Product> = new Map([
  [
    '1',
    {
      category: 'laptops',
      id: '1',
      name: 'Laptop 1',
      price: 456,
      quantity: 2,
      productionDate: '2015-12-12',
    },
  ],
  [
    '2',
    {
      category: 'laptops',
      id: '2',
      name: 'Laptop 2',
      price: 1947,
      quantity: 20000,
      productionDate: '2015-11-11',
    },
  ],
  [
    '3',
    {
      category: 'laptops',
      id: '3',
      name: 'Laptop 3',
      price: 2680,
      quantity: 8,
      productionDate: '2015-10-10',
    },
  ],
]);

export const productModel = {
  getById: (id: string) => {
    return dbProducts.get(id);
  },

  getMany: () => {
    return Array.from(dbProducts.values());
  },

  create: (newProduct: Omit<Product, 'id'>) => {
    const product: Product = { ...newProduct, id: Date.now().toString() };
    dbProducts.set(product.id, product);
    return product;
  },

  update: (updatedProduct: Product) => {
    if (dbProducts.has(updatedProduct.id)) {
      dbProducts.set(updatedProduct.id, updatedProduct);
    }

    return updatedProduct;
  },
};
