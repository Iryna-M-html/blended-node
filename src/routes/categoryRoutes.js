import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  categoryIdParamSchema,
  createCategorySchema,
  getCategoriesSchema,
  updateCategorySchema,
} from '../validations/categoriesValidation.js';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
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
router.patch(
  '/categories/:id',
  celebrate(updateCategorySchema),
  ctrlWrapper(updateCategory),
);
export default router;
