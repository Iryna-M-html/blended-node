import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
} from '../controllers/authController.js';
import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API для аутентификации и управления пользователями
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Регистрация нового пользователя
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Имя пользователя
 *                 example: "Иван Иванов"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: Пароль (минимум 6 символов)
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Пользователь успешно зарегистрирован
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
 *                   example: "Successfully registered a user!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT токен доступа
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *       400:
 *         description: Ошибка валидации
 *       409:
 *         description: Пользователь с таким email уже существует
 */
router.post('/auth/register', celebrate(registerUserSchema), registerUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Вход пользователя в систему
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email пользователя
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Успешный вход
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: sessionId=abc123; Path=/; HttpOnly
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
 *                   example: "Successfully logged in a user!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: JWT токен доступа
 *       401:
 *         description: Неверные учетные данные
 *       404:
 *         description: Пользователь не найден
 */
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Выход пользователя из системы
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       204:
 *         description: Успешный выход (нет содержимого)
 *       401:
 *         description: Не авторизован
 */
router.post('/auth/logout', logoutUser);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Обновление сессии пользователя
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Сессия успешно обновлена
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
 *                   example: "Successfully refreshed a session!"
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       description: Новый JWT токен доступа
 *       401:
 *         description: Сессия недействительна или истекла
 */
router.post('/auth/refresh', refreshUserSession);

export default router;
