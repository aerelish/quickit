import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

router.get('/todo', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos);
  } catch (error) {
    res.status(503).json({ message: 'Internal server error' });    
  }
});

router.post('/todo', async (req, res) => {
  
  const { title } = req.body;

  try {
    const todo = await prisma.todo.create({
      data: {
        title: title
      }
    })
    res.json(todo);
  } catch (error) {
    res.status(503).json({ message: 'Internal server error' }); 
  }
});

export default router;