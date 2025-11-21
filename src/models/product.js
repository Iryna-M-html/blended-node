import { Schema } from 'mongoose';
import { model } from 'mongoose';
const productSchema = new Schema(
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
productSchema.index(
  {
    name: 'text',
    description: 'text',
  },
  { name: 'ProductTextIndex' },
);
export const Product = model('Product', productSchema);
// если не указано required: true поле автоматически становится optional.
