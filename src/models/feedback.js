import { Schema, model } from 'mongoose';
import { Product } from './product.js';

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

async function updateGoodAverage(productId) {
  const feedbacks = await Feedback.find({ product: productId });

  if (!feedbacks.length) {
    await Product.findByIdAndUpdate(productId, {
      averageRate: 0,
      feedbackCount: 0,
    });
    return;
  }

  const total = feedbacks.reduce((sum, fb) => sum + fb.rate, 0);
  console.log(total);
  const average = Math.round((total / feedbacks.length) * 10) / 10;

  await Product.findByIdAndUpdate(productId, {
    averageRate: average.toFixed(2),
    feedbackCount: feedbacks.length,
  });
}

feedbackSchema.post('save', async function () {
  await updateGoodAverage(this.product);
});

feedbackSchema.post('findOneAndDelete', async function (doc) {
  if (doc) await updateGoodAverage(doc.product);
});
export const Feedback = model('Feedback', feedbackSchema);
