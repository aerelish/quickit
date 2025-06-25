import express from 'express';
import todoRoutes from './todoRoutes.js'

const router = express.Router();

router.use('/todo', todoRoutes)

export default router;