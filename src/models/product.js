import mongoose from 'mongoose';
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: String,
      required: true,
      enum: ['Books', 'Electronics', 'Clothing', 'Other'],
      default: 'Other',
    },
    description: { type: String },
  },
  {
    timestamps: true,
  },
);

export const Product = mongoose.model('Product', productSchema);
// если не указано required: true поле автоматически становится optional.
