import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  categoryIdParamSchema,
  createCategorySchema,
  getCategoriesSchema,
} from '../validations/categoriesValidation.js';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
} from '../controllers/categoryController.js';

const router = Router();
router.get(
  '/categories',
  celebrate(getCategoriesSchema),
  ctrlWrapper(getAllCategories),
);

router.get(
  '/categories/:id',
  celebrate(categoryIdParamSchema),
  ctrlWrapper(getCategoryById),
);
router.post(
  '/categories',
  celebrate(createCategorySchema),
  ctrlWrapper(createCategory),
);

export default router;
