import { Router } from 'express';
import { celebrate } from 'celebrate';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { createOrderSchema } from '../validations/ordersValidation.js';
import { createOrder, getUserOrders } from '../controllers/orderController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();
router.use('/orders', authenticate);
router.post('/orders', celebrate(createOrderSchema), ctrlWrapper(createOrder));
router.get('/orders', authenticate, ctrlWrapper(getUserOrders));
export default router;
