import { Router } from 'express';
import { processTelegramUpdate } from '../services/telegram.js';

const router = Router();

router.post(
  `/api/telegram/webhook/${process.env.TELEGRAM_BOT_TOKEN}`,
  (req, res) => {
    processTelegramUpdate(req.body);
    res.sendStatus(200);
  },
);

export default router;
