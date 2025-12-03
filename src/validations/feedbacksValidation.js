import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const createFeedbackSchema = {
  [Segments.BODY]: Joi.object({
    author: Joi.string().min(2).required(),
    rate: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().min(2).required(),
    product: Joi.string().custom(objectIdValidator).required(),
    category: Joi.string()
      .valid('Books', 'Electronics', 'Clothing', 'Other')
      .default('Other')
      .required(),
  }),
};
export const getAllFeedbacksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(12).default(3),
    product: Joi.string().custom(objectIdValidator).trim(),
    category: Joi.string().custom(objectIdValidator).trim(),
    rate: Joi.number().integer().min(1).max(5),
  }),
};
