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
import { requireAdmin } from '../middleware/requireAdmin.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API для управления продуктами
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Получить список всех продуктов
 *     tags: [Products]
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
 *         name: category
 *         schema:
 *           type: string
 *         description: Фильтр по категории
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Минимальная цена
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Максимальная цена
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [price, name, createdAt]
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
 *         description: Список продуктов успешно получен
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
 *                   example: "Successfully found products!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           description:
 *                             type: string
 *                           price:
 *                             type: number
 *                           category:
 *                             type: string
 *                           imageUrl:
 *                             type: string
 *                           inStock:
 *                             type: boolean
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
router.get('/products', getAllProducts);

router.use('/products', authenticate);

/**
 * @swagger
 * /products/productId:
 *   get:
 *     summary: Получить продукт по ID
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукта
 *     responses:
 *       200:
 *         description: Продукт успешно найден
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
 *                   example: "Successfully found product with id {productId}!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     inStock:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Продукт не найден
 *       401:
 *         description: Не авторизован
 */
router.get('/products/productId', celebrate(productIdSchema), getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Создать новый продукт (только для администраторов)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название продукта
 *                 example: "Ноутбук Acer"
 *               description:
 *                 type: string
 *                 description: Описание продукта
 *                 example: "Мощный ноутбук для работы и игр"
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Цена продукта
 *                 example: 45000
 *               category:
 *                 type: string
 *                 description: ID категории
 *                 example: "507f1f77bcf86cd799439011"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Изображение продукта
 *               inStock:
 *                 type: boolean
 *                 default: true
 *                 description: Наличие на складе
 *     responses:
 *       201:
 *         description: Продукт успешно создан
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
 *                   example: "Successfully created a product!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     category:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     inStock:
 *                       type: boolean
 *       400:
 *         description: Ошибка валидации
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен (требуются права администратора)
 */
router.post(
  '/products',
  upload.single('image'),
  requireAdmin,
  celebrate(createProductSchema),
  createProduct,
);

/**
 * @swagger
 * /products/productId:
 *   patch:
 *     summary: Обновить продукт (только для администраторов)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукта
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Название продукта
 *               description:
 *                 type: string
 *                 description: Описание продукта
 *               price:
 *                 type: number
 *                 minimum: 0
 *                 description: Цена продукта
 *               category:
 *                 type: string
 *                 description: ID категории
 *               inStock:
 *                 type: boolean
 *                 description: Наличие на складе
 *     responses:
 *       200:
 *         description: Продукт успешно обновлен
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
 *                   example: "Successfully patched a product!"
 *                 data:
 *                   type: object
 *       404:
 *         description: Продукт не найден
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен
 */
router.patch(
  '/products/productId',
  celebrate(updateProductSchema),
  updateProduct,
);

/**
 * @swagger
 * /products/productId:
 *   delete:
 *     summary: Удалить продукт (только для администраторов)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID продукта
 *     responses:
 *       204:
 *         description: Продукт успешно удален
 *       404:
 *         description: Продукт не найден
 *       401:
 *         description: Не авторизован
 *       403:
 *         description: Доступ запрещен (требуются права администратора)
 */
router.delete('/products/productId', celebrate(productIdSchema), deleteProduct);

export default router;
