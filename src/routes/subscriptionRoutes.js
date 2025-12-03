import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createSubscriptionSchema } from '../validations/subscriptionsValidation.js';
import { createSubscription } from '../controllers/subscriptionController.js';

const router = Router();
router.post(
  '/subcsriptions',
  celebrate(createSubscriptionSchema),
  ctrlWrapper(createSubscription),
);
export default router;
