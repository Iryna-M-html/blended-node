import { Router } from 'express';
import { celebrate } from 'celebrate';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createFeedbackSchema,
  getAllFeedbacksSchema,
} from '../validations/feedbacksValidation.js';
import {
  createFeedback,
  getAllFeedbacks,
} from '../controllers/feedbackController.js';
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: API для управления отзывами
 */

/**
 * @swagger
 * /feedbacks:
 *   post:
 *     summary: Создать новый отзыв
 *     tags: [Feedbacks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: "Иван Иванов"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: "ivan@example.com"
 *               message:
 *                 type: string
 *                 description: Текст отзыва
 *                 example: "Отличный сервис!"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Оценка от 1 до 5
 *                 example: 5
 *     responses:
 *       201:
 *         description: Отзыв успешно создан
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
 *                   example: "Feedback created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "507f1f77bcf86cd799439011"
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     message:
 *                       type: string
 *                     rating:
 *                       type: number
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Ошибка валидации
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post(
  '/feedbacks',
  celebrate(createFeedbackSchema),
  ctrlWrapper(createFeedback),
);

/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Получить список всех отзывов
 *     tags: [Feedbacks]
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
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [createdAt, rating, name]
 *           default: createdAt
 *         description: Поле для сортировки
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Порядок сортировки
 *     responses:
 *       200:
 *         description: Список отзывов успешно получен
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
 *                   example: "Feedbacks retrieved successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedbacks:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           email:
 *                             type: string
 *                           message:
 *                             type: string
 *                           rating:
 *                             type: number
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
 *       500:
 *         description: Внутренняя ошибка сервера
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  '/feedbacks',
  celebrate(getAllFeedbacksSchema),
  ctrlWrapper(getAllFeedbacks),
);

export default router;
