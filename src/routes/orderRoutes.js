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
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API для управления заказами
 */

router.use('/orders', authenticate);

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Создать новый заказ
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *               - shippingAddress
 *             properties:
 *               products:
 *                 type: array
 *                 description: Список продуктов в заказе
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       description: ID продукта
 *                     quantity:
 *                       type: integer
 *                       minimum: 1
 *                       description: Количество
 *                 example:
 *                   - productId: "507f1f77bcf86cd799439011"
 *                     quantity: 2
 *                   - productId: "507f1f77bcf86cd799439012"
 *                     quantity: 1
 *               shippingAddress:
 *                 type: object
 *                 required:
 *                   - street
 *                   - city
 *                   - country
 *                   - zipCode
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "ул. Ленина, 10"
 *                   city:
 *                     type: string
 *                     example: "Москва"
 *                   country:
 *                     type: string
 *                     example: "Россия"
 *                   zipCode:
 *                     type: string
 *                     example: "123456"
 *               paymentMethod:
 *                 type: string
 *                 enum: [card, cash, online]
 *                 default: card
 *                 description: Способ оплаты
 *     responses:
 *       201:
 *         description: Заказ успешно создан
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
 *                   example: "Order created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     orderNumber:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                     totalAmount:
 *                       type: number
 *                     status:
 *                       type: string
 *                       example: "pending"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 */
router.post('/orders', celebrate(createOrderSchema), ctrlWrapper(createOrder));

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Получить заказы текущего пользователя
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Количество элементов на странице
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, shipped, delivered, cancelled]
 *         description: Фильтр по статусу заказа
 *     responses:
 *       200:
 *         description: Список заказов успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     orders:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           orderNumber:
 *                             type: string
 *                           products:
 *                             type: array
 *                             items:
 *                               type: object
 *                           totalAmount:
 *                             type: number
 *                           status:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *                         totalItems:
 *                           type: integer
 *       401:
 *         description: Не авторизован
 */
router.get('/orders', authenticate, ctrlWrapper(getUserOrders));

/**
 * @swagger
 * /orders/productId/status:
 *   patch:
 *     summary: Обновить статус заказа (только для администраторов)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - status
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: ID заказа
 *                 example: "507f1f77bcf86cd799439011"
 *               status:
 *                 type: string
 *                 enum: [pending, processing, shipped, delivered, cancelled]
 *                 description: Новый статус заказа
 *                 example: "shipped"
 *     responses:
 *       200:
 *         description: Статус заказа успешно обновлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Order status updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     orderNumber:
 *                       type: string
 *                     status:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен (требуются права администратора)
 *       404:
 *         description: Заказ не найден
 */
router.patch(
  '/orders/productId/status',
  authenticate,
  requireAdmin,
  celebrate(updateStatusSchema),
  ctrlWrapper(updateOrderStatus),
);

export default router;
