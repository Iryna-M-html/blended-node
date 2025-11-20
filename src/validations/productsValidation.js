import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};
export const productIdSchema = {
  [Segments.PARAMS]: Joi.object({
    productId: Joi.string().custom(objectIdValidator).required(),
  }),
};
export const createProductSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().required(),
    category: Joi.string()
      .valid('Books', 'Electronics', 'Clothing', 'Other')
      .default('Other')
      .required(),
  }),
};

export const updateProductSchema = {
  ...productIdSchema,
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().required(),
    category: Joi.string()
      .valid('Books', 'Electronics', 'Clothing', 'Other')
      .default('Other')
      .required(),
  }).min(1),
};
