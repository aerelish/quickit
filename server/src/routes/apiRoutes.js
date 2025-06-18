import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

router.get('/todo', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany()
    res.json(todos);
  } catch (error) {
    console.log(error.message)
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
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
});

router.put('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id)
      },
      data: {
        title
      }
    });
    res.json(updatedTodo)
  } catch (error){
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
}) 

router.delete('/todo/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(id)
      }
    });
    res.json({message: 'Deleted successfully...'})
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' });  
  }
})

export default router;