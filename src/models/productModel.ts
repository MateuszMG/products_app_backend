interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productionDate: string;
  category: string;
}

const dbProducts: Product[] = [
  {
    category: 'laptops',
    id: '1',
    name: 'Laptop 1',
    price: 456,
    quantity: 2,
    productionDate: '2015-12-12',
  },
  {
    category: 'laptops',
    id: '2',
    name: 'Laptop 3',
    price: 1947,
    quantity: 20000,
    productionDate: '2015-11-11',
  },
  {
    category: 'laptops',
    id: '3',
    name: 'Laptop 3',
    price: 2680,
    quantity: 8,
    productionDate: '2015-10-10',
  },
];

export const productModel = {
  getById: (id: string) => {
    return dbProducts.find((product) => product.id === id);
  },

  getMany: () => {
    return dbProducts;
  },

  create: (newProduct: Omit<Product, 'id'>) => {
    const product: Product = { ...newProduct, id: Date.now().toString() };
    dbProducts.push(product);
    return product;
  },

  update: (upatedProduct: Product) => {
    dbProducts.map((product) =>
      product.id === upatedProduct.id ? upatedProduct : product,
    );
    return upatedProduct;
  },
};
