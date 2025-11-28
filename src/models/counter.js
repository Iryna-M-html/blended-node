import { Schema, model } from 'mongoose';

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

export const Counter = model('Counter', counterSchema);





// seq = sequence number / последовательный номер

// Это поле хранит текущее значение счётчика.

// Обычно такие документы используются для:

// генерации уникальных последовательных номеров

// создания автоинкрементных ID (1, 2, 3, 4…)

// генерации номеров заказов, пользователей, артикулов, чеков и т.д.
