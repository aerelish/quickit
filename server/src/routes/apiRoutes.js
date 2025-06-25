import express from 'express';
import authRoutes from './authRoutes.js'
import todoRoutes from './todoRoutes.js'

const router = express.Router();

/** /api/auth */
router.use('/auth', authRoutes)

/** /api/todo */
router.use('/todo', todoRoutes)

export default router;