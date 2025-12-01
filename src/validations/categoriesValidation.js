import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

export const getCategoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(7).default(6),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const categoryIdParamSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createCategorySchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().allow('', null),
    img: Joi.string().uri().allow('', null),
    img_id: Joi.string().trim().allow('', null),
  }),
};
