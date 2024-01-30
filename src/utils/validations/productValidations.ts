import * as Yup from 'yup';

const yupProductObject = {
  name: Yup.string()
    .required('Product name is required')
    .max(100, 'Product name must be at most 100 characters')
    .label('Product name'),

  description: Yup.string()
    .max(2000, 'Product description must be at most 2000 characters')
    .default('')
    .label('Product description'),

  price: Yup.number()
    .required('Price is required')
    .min(1, 'Price must be at least 1')
    .max(1_000_000, 'Price must be at most 1,000,000')
    .label('Price'),

  quantity: Yup.number()
    .required('Quantity is required')
    .min(1, 'Quantity must be at least 1')
    .max(1_000_000, 'Quantity must be at most 1,000,000')
    .integer('Quantity must be an integer')
    .label('Quantity'),

  category: Yup.string()
    .required('Category is required')
    .max(100, 'Category must be at most 100 characters')
    .label('Category'),

  productionDate: Yup.string()
    .required('Production date is required')
    .label('Production date'),
};

const yupIdObject = {
  id: Yup.string()
    .required()
    .matches(/^[0-9]+$/, 'Id not found')
    .label('Id'),
};

export const getProductValidation = Yup.object({
  ...yupIdObject,
});

export const createProductValidation = Yup.object({
  ...yupProductObject,
});

export const editProductValidation = Yup.object({
  ...yupProductObject,
  ...yupIdObject,
});

export const deleteProductValidation = Yup.object({
  ...yupIdObject,
});
