import createHttpError from 'http-errors';
import { Order } from '../models/order.js';
import { ORDER_STATUS } from '../constants/orderStatuses.js';
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

export const updateOrderStatus = async (req, res, next) => {
  const { productId, orderNum, status } = req.body;

  if (!ORDER_STATUS.includes(status)) {
    return next(createHttpError(400, 'Invalid order status'));
  }

  const updated = await Order.findOneAndUpdate(
    {
      orderNum: orderNum,
      'products.productId': productId,
    },
    { status },
    { new: true },
  );

  if (!updated) {
    return next(createHttpError(404, 'Order not found'));
  }

  res.json(updated);
};
