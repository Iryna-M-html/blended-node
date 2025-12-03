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

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API для управления категориями
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Получить список всех категорий
 *     tags: [Categories]
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
 *     responses:
 *       200:
 *         description: Список категорий успешно получен
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
 *                   example: "Successfully found categories!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           slug:
 *                             type: string
 *                           description:
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
 */
router.get(
  '/categories',
  celebrate(getCategoriesSchema),
  ctrlWrapper(getAllCategories),
);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Получить категорию по ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID категории
 *     responses:
 *       200:
 *         description: Категория успешно найдена
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
 *                   example: "Successfully found category with id {id}!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     description:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Категория не найдена
 */
router.get(
  '/categories/:id',
  celebrate(categoryIdParamSchema),
  ctrlWrapper(getCategoryById),
);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Создать новую категорию
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название категории
 *                 example: "Электроника"
 *               description:
 *                 type: string
 *                 description: Описание категории
 *                 example: "Категория электронных товаров"
 *     responses:
 *       201:
 *         description: Категория успешно создана
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
 *                   example: "Successfully created a category!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     description:
 *                       type: string
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 */
router.post(
  '/categories',
  celebrate(createCategorySchema),
  ctrlWrapper(createCategory),
);

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Обновить категорию
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID категории
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название категории
 *               description:
 *                 type: string
 *                 description: Описание категории
 *     responses:
 *       200:
 *         description: Категория успешно обновлена
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
 *                   example: "Successfully patched a category!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     slug:
 *                       type: string
 *                     description:
 *                       type: string
 *       404:
 *         description: Категория не найдена
 *       401:
 *         description: Не авторизован
 */
router.patch(
  '/categories/:id',
  celebrate(updateCategorySchema),
  ctrlWrapper(updateCategory),
);

export default router;
