import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import authRoutes from '../modules/auth/authRoutes.js';
import userRoutes from '../modules/user/userRoutes.js';
import todoRoutes from '../modules/todo/todoRoutes.js';

const router = express.Router();

// unprotected routes

/** /api/auth */
router.use('/auth', authRoutes)

// protected routes

/** /api/user */
router.use('/user', authMiddleware, userRoutes)
/** /api/todo */
router.use('/todo', authMiddleware, todoRoutes)

export default router;