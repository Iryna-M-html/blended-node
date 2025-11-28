import createHttpError from 'http-errors';
import { Order } from '../models/order.js';
// import { ORDER_STATUS } from '../constants/orderStatuses';
import { User } from '../models/user.js';

export const createOrder = async (req, res, next) => {
  const { userPhone } = req.body;
  if (!req.body.userPhone) {
    return next(createHttpError(400, 'Phone is required'));
  }
  const existingUser = await User.findOne({ phone: userPhone });

  const date = new Date().toISOString();

  const newOrder = await Order.create({
    ...req.body,
    // userId: req.user._id, // привязываем к авторизованному пользователю
    userId: existingUser ? existingUser._id : null,
    date,
  });

  res.status(201).json(newOrder);
};

export const getUserOrders = async (req, res, next) => {
  const orders = await Order.find({ userId: req.user._id });
  if (orders.length === 0) {
    return next(createHttpError(404, 'Order not found'));
  }
  res.status(200).json(orders);
};
