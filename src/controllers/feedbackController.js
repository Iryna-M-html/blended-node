import { Feedback } from '../models/feedback.js';
export const createFeedback = async (req, res, next) => {
  const feedback = await Feedback.create(req.body);
  res.status(201).json(feedback);
};
