import { Product } from '../models/product.js';
// import createHttpError from 'http-errors';

export const getAllProducts = async (req, res) => {
  const notes = await Product.find();
  res.status(200).json(notes);
};

export const getProductById = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: `Product not found` });
  }
  res.status(200).json({ message: `Retrieved note with ID: ${productId}` });
};

// export const createNote = async (req, res) => {
//   const note = await Note.create(req.body);
//   res.status(201).json(note);
// };

// export const deleteNote = async (req, res) => {
//   const { noteId } = req.params;

//   const note = await Note.findOneAndDelete({
//     _id: noteId,
//   });

//   if (!note) {
//     throw createHttpError(404, 'Note not found');
//   }

//   res.status(200).json(note);
// };

// export const updateNote = async (req, res) => {
//   const { noteId } = req.params;

//   const note = await Note.findOneAndUpdate({ _id: noteId }, req.body, {
//     new: true,
//   });
//   if (!note) {
//     throw createHttpError(404, 'Note not found');
//   }

//   res.status(200).json(note);
// };
