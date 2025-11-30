import { Subscription } from '../models/subscription.js';

export const createSubscription = async (req, res) => {
  const { email } = req.body;

  const existingSubscription = await Subscription.findOne({ email });
  if (existingSubscription) {
    return res.status(200).json({
      message: 'You have successfully subscribed to our newsletter!',
    });
  }
  await Subscription.create({ email });

  //   sendWelcomeEmail(email);

  res.status(201).json({
    message: 'You have successfully subscribed to our newsletter!',
  });
};
