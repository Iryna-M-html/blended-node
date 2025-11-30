import { Schema, model } from 'mongoose';
// import { Product } from './product';

const feedbackSchema = new Schema(
  {
    author: { type: String, required: true, trim: true },
    rate: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    category: {
      type: String,
      required: true,
      enum: ['Books', 'Electronics', 'Clothing', 'Other'],
      default: 'Other',
    },
  },
  { timestamps: true, versionKey: false },
);

export const Feedback = model('Feedback', feedbackSchema);
console.log(feedbackSchema);
