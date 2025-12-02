import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createOrderSchema,
  updateStatusSchema,
} from '../validations/ordersValidation.js';
import {
  createOrder,
  getUserOrders,
  updateOrderStatus,
} from '../controllers/orderController.js';
import { authenticate } from '../middleware/authenticate.js';
// import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();
router.use('/orders', authenticate);
router.post('/orders', celebrate(createOrderSchema), ctrlWrapper(createOrder));
router.get('/orders', authenticate, ctrlWrapper(getUserOrders));
//????
router.patch(
  '/orders/productId/status',
  authenticate,
  // requireAdmin,
  celebrate(updateStatusSchema),
  ctrlWrapper(updateOrderStatus),
);
export default router;
