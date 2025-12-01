import createHttpError from 'http-errors';
import { Category } from '../models/category.js';

export const getAllCategories = async (req, res) => {
  const { page = 1, perPage = 6 } = req.query;

  if (page < 1) {
    throw createHttpError(400, 'The page number must be greater than 0');
  }

  const skip = (page - 1) * perPage;

  const categoriesQuery = Category.find();

  const [totalItems, categories] = await Promise.all([
    categoriesQuery.clone().countDocuments(),
    categoriesQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    success: true,
    message: 'Get all categories endpoint',
    categories,
    page,
    perPage,
    totalItems,
    totalPages,
  });
};
export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw createHttpError(404, 'Category not found');
  }

  res.status(200).json({
    success: true,
    message: 'Get category by id endpoint',
    category,
  });
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw createHttpError(400, "The 'name' field is required");
  }

  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw createHttpError(409, 'A category with this name already exists');
  }

  const category = await Category.create({ name });

  res.status(201).json({
    success: true,
    message: 'Category created successfully',
    category,
  });
};
