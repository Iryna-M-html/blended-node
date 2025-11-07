import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
} from '../controllers/productsController.js';
const router = Router();
router.get('/products', getAllProducts);
router.get('/products/productId', getProductById);

// import {
//   getAllNotes,
//   getNoteById,
//   createNote,
//   deleteNote,
//   updateNote,
// } from '../controllers/notesController.js';

// const router = Router();

// router.get('/notes', getAllNotes);

// router.get('/notes/:noteId', getNoteById);

// router.post('/notes', createNote);
// router.delete('/notes/:noteId', deleteNote);
// router.patch('/notes/:noteId', updateNote);
export default router;
