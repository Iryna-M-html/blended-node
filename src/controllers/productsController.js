import { Product } from '../models/product.js';
import createHttpError from 'http-errors';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getAllProducts = async (req, res) => {
  const { page = 1, perPage = 5, search } = req.query;
  const skip = (page - 1) * perPage;
  const productsQuery = Product.find();
  // const productsQuery = Product.find({ userId: req.user._id });

  if (search) {
    productsQuery.where({ $text: { $search: search } });
  }

  const [totalItems, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    products,
  });
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findOne({
    _id: productId,
    // userId: req.user._id,
  });

  if (!product) {
    return res.status(404).json({ message: `Product not found` });
  }
  res.status(200).json(product);
};

export const createProduct = async (req, res) => {
  let imageUrl = null;

  if (req.file) {
    const cloudinaryResult = await saveFileToCloudinary(
      req.file.buffer,
      'product',
    );
    imageUrl = cloudinaryResult.secure_url;
  }
  const product = await Product.create({
    ...req.body,
    image: imageUrl,
    userId: req.user._id,
  });
  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndUpdate(
    {
      _id: productId,
      userId: req.user._id,
    },
    req.body,
    {
      new: true,
    },
  );
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};

export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndDelete({
    _id: productId,
    userId: req.user._id,
  });

  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);
};
