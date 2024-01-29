interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  productionDate: string;
  category: string;
}

const dbProducts: Product[] = [];

export const productModel = {
  getMany: () => {
    return dbProducts;
  },

  create: (newProduct: Omit<Product, 'id'>) => {
    const product: Product = { ...newProduct, id: Date.now().toString() };
    dbProducts.push(product);
    return product;
  },
};
