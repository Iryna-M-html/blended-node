import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { logger } from './middleware/logger.js';
import productsRoutes from './routes/productsRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import orderRoutes from './routes/orderRoutes.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
// import telegramRoutes from './routes/telegramRoutes.js';
// import {
//   processTelegramUpdate,
//   setupTelegramWebhook,
// } from './services/telegram.js';
const app = express();
const PORT = process.env.PORT ?? 3030;

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger);

app.get('/', (req, res) => {
  res.send('✅ API is running!');
});
app.use(authRoutes);
app.use(productsRoutes);
app.use(orderRoutes);
app.use(subscriptionRoutes);
// app.use(telegramRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
await connectMongoDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// const startServer = async () => {
//   await connectMongoDB();

//   if (process.env.NODE_ENV === 'production') {
//     await setupTelegramWebhook();
//   }
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// };
// startServer();
