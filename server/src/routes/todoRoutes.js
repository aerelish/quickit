import express from 'express';
import prisma from '../prismaClient.js';

const router = express.Router();

// get todos for user
router.get('/', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.userId
      }
    })
    res.json(todos);
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' });    
  }
});

// create new todo for user
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await prisma.todo.create({
      data: {
        title: title,
        userId: req.userId
      }
    })
    res.json(todo);
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
});

// update todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
        userId: req.userId
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

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(id),
        userId: req.userId
      }
    });
    res.json({message: 'Deleted successfully...'})
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' });  
  }
})

export default router;