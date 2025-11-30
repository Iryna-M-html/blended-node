import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createFeedbackSchema } from '../validations/feedbacksValidation.js';
import { createFeedback } from '../controllers/feedbackController.js';
const router = Router();

router.post(
  '/feedbacks',
  celebrate(createFeedbackSchema),
  ctrlWrapper(createFeedback),
);

export default router;
