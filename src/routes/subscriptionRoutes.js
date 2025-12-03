import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createSubscriptionSchema } from '../validations/subscriptionsValidation.js';
import { createSubscription } from '../controllers/subscriptionController.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Subscriptions
 *   description: API для управления подписками на новости
 */

/**
 * @swagger
 * /subcsriptions:
 *   post:
 *     summary: Подписаться на рассылку новостей
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email для подписки
 *                 example: "user@example.com"
 *               name:
 *                 type: string
 *                 description: Имя подписчика (необязательно)
 *                 example: "Иван Иванов"
 *     responses:
 *       201:
 *         description: Подписка успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "Successfully subscribed!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     name:
 *                       type: string
 *                       example: "Иван Иванов"
 *                     subscribedAt:
 *                       type: string
 *                       format: date-time
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Ошибка валидации (неверный формат email)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Email уже подписан на рассылку
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 409
 *                 message:
 *                   type: string
 *                   example: "Email already subscribed"
 */
router.post(
  '/subcsriptions',
  celebrate(createSubscriptionSchema),
  ctrlWrapper(createSubscription),
);

export default router;
