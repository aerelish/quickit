import express from 'express';
import prisma from '../../db/prismaClient.js';

const router = express.Router();

// get todos for user
router.get('/', async (req, res) => {
  try {
    
    const todos = await prisma.todo.findMany({
      where: {
        userId: req.userId
      }, 
      select: {
        id: true,
        title: true,
        completed: true,
        priority: true
      },
      orderBy: [
        { completed: 'asc'},
        { priority: 'asc' },
        { createdDateTime: 'desc' }
      ],
    });

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

    const maxPriority = await prisma.todo.aggregate({
      _max: { 
        priority: true },
      where: {
        userId: req.userId
      }
    });

    const priority = (maxPriority._max.priority ?? 0) + 1;

    const todo = await prisma.todo.create({
      data: {
        title: title,
        userId: req.userId,
        priority
      }, 
      select: {
        id: true,
        title: true,
        completed: true,
        priority: true,
        createdDateTime: true,
      }
    })
    
    res.json(todo);
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
});

// update todo priority
router.put('/swap', async(req, res) => {
  // source = todo that you want to increase/decrease in priority
  // target = todo that you are targeting, e.g. the one above or below
  const { source, target } = req.body
  try {
    
    // get sourceTodo and targeTodo
    const [sourceTodo, targetTodo] = await prisma.todo.findMany({
      where: {
        id: { in: [source, target] },
        userId: req.userId,
      },
      select: { id: true, priority: true },
    });

    // check if both exist
    if (sourceTodo == null || targetTodo == null) {
      return res.status(404).json({ message: 'One or both todos not found' });
    }

    // swap values
    const [todoSource, todoTarget] = await prisma.$transaction([
      // updating source
      prisma.todo.update({
        where: { id: source, userId: req.userId },
        data: { priority: targetTodo.priority }
      }),
      // updating target
      prisma.todo.update({
        where: { id: target, userId: req.userId},
        data: { priority: sourceTodo.priority }
      })
    ]);

    res.json([todoSource, todoTarget])
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  };
});

// update todo
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, title } = req.body;
  try {

    const updatedTodo = await prisma.todo.update({
      where: {
        id: parseInt(id),
        userId: req.userId
      },
      data: data,
       select: {
        id: true,
        title: true,
        completed: true,
        priority: true
      }
    });
    
    res.json(updatedTodo) 
  } catch (error){
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
}) 

// delete todo
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(id),
        userId: req.userId
      }
    });
    res.json({ success: true, message: 'Deleted successfully...' })
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ success: false, message: 'Internal server error' });  
  }
})


export default router;