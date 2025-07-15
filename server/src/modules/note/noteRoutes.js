import express from 'express';
import prisma from '../../db/prismaClient.js';

const router = express.Router();

// get all notes
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

// add new note
router.post('/', async (req, res) => {
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

// update note
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { data } = req.body
  try {
    const updatedNote = await prisma.note.update({
      where: {
        id: parseInt(id),
        userId: req.userId
      },
      data: data,
      select: {
        id: true,
        index: true,
        content: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    res.json(updatedNote) 
  } catch (error){
    console.log(error.message)
    res.status(503).json({ message: 'Internal server error' }); 
  }
})

// delete note
router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    await prisma.note.delete({
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
