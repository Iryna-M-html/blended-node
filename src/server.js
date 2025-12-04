import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger.config.js';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import productsRoutes from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import telegramRoutes from './routes/telegramRoutes.js';
import userRoutes from './routes/userRoutes.js';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { adminOptions } from './admin/admin.config.js';
import MongoStore from 'connect-mongo';
import { authenticate } from './admin/auth.js';
import helmet from 'helmet';
import { setupTelegramWebhook } from './services/telegram.js';
const app = express();
const PORT = process.env.PORT ?? 3030;
const isProd = process.env.NODE_ENV === 'production';
// ============================================
// ADMINJS SETUP
// ============================================
// let adminInstance = null;

const createAdminJS = () => {
  const admin = new AdminJS(adminOptions);

  const sessionStore = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    collectionName: 'admin_sessions',
    ttl: 24 * 60 * 60,
  });
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: process.env.ADMIN_COOKIE_SECRET,
    },
    null,
    {
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
      secret: process.env.ADMIN_SESSION_SECRET,
      cookie: {
        httpOnly: true,
        secure: isProd,
        maxAge: 1000 * 60 * 60 * 24,
      },
      name: 'adminjs',
    },
  );
  app.use(admin.options.rootPath, adminRouter);

  if (!isProd) {
    admin.watch();
  }
  console.log('✅ AdminJS mounted at:', admin.options.rootPath);
  // adminInstance = admin; nt
};

createAdminJS();
// ===========================================
app.set('trust proxy', isProd ? 1 : false);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

//где взять url клиентов
const allowList = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_2,
  process.env.CLIENT_URL_LOCAL,
].filter(Boolean);

if (isProd) {
  if (allowList.length === 0) {
    app.use(cors({ origin: false }));
  } else {
    app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          if (allowList.includes(origin)) return callback(null, true);
          return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
      }),
    );
  }
} else {
  app.use(cors());
}

app.use(cookieParser());
app.use(logger);

app.get('/', (req, res) => {
  res.send('✅ Welcome to Products API');
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(authRoutes);
app.use(userRoutes);
app.use(productsRoutes);
app.use(orderRoutes);
app.use(subscriptionRoutes);
app.use(feedbackRoutes);
app.use(categoryRoutes);
app.use(telegramRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
await connectMongoDB();

if (process.env.NODE_ENV === 'production') {
  await setupTelegramWebhook();
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// startServer();
