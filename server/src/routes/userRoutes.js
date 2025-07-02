import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

// route: api/user/
router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users)
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: 'Internal server error' });  
  }
});

export default router;