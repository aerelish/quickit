import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import authRoutes from './authRoutes.js'
import userRoutes from './userRoutes.js'
import todoRoutes from './todoRoutes.js'

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