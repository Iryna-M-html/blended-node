import { User } from '../models/user.js';
import { Product } from '../models/product.js';
import { Order } from '../models/order.js';
export const resources = [
  {
    resource: User,
    options: {
      properties: {
        password: {
          type: 'password',
          isVisible: { list: false, show: false, edit: true },
        },
      },
    },
  },
  { resource: Product },

  { resource: Order },
];
