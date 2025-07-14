import express from 'express';
import prisma from '../../db/prismaClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: req.userId
      },
      select: {
        id: true,
        index: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    })
    res.json(notes)
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' });   
  }  
})

router.post('/', async(req, res) => {
  const { content } = req.body;
  try {
    
    const maxIndex = await prisma.note.aggregate({
      _max: {
        index: true
      },
      where: {
        userId: req.userId
      }
    })

    const index = (maxIndex._max.index ?? 0) + 1

    const note = await prisma.note.create({
      data: {
        content: content,
        userId: req.userId,
        index
      }, 
      select: {
        id: true,
        index: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    })
    res.json(note)
  } catch (error) {
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
})

export default router;
