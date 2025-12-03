import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct,
} from '../controllers/productsController.js';

import {
  productIdSchema,
  createProductSchema,
  updateProductSchema,
} from '../validations/productsValidation.js';

import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();
router.use('/products', authenticate);
router.get('/products', getAllProducts);
router.get('/products/productId', celebrate(productIdSchema), getProductById);
router.post(
  '/products',
  upload.single('image'),
  celebrate(createProductSchema),
  createProduct,
);
router.patch(
  '/products/productId',
  celebrate(updateProductSchema),
  updateProduct,
);
router.delete('/products/productId', celebrate(productIdSchema), deleteProduct);

export default router;
