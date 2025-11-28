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
    userId: existingUser ? existingUser._id : null,
    date,
  });

  res.status(201).json(newOrder);
};
