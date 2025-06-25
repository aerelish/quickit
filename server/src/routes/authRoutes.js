import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';
import { Gender } from '@prisma/client';

const router = express.Router()

router.post('/register', async (req, res) => {
  const { username, password, fullname, birthdate, gender } = req.body;

  // salt = cost factor, determines how many times to run the hashing algorithm
  const saltRounds = 8;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // optional: validate input
  if (!Object.values(Gender).includes(gender)) {
    return res.status(400).json({ error: 'Invalid gender' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        fullname,
        birthdate: new Date(birthdate),
        gender
      }
    });
    res.json(user)
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: 'Internal server error' });  
  };
});

//  const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });

    // if user not found, return error
    if (!user) {
      return res.status(404).json({ 
        success: false,
        message: 'User not found' 
      });
    };

    // compare the password with the hashed password in the database
    const isMatch = bcrypt.compareSync(password, user.password);

    // if password does not match, return error
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid credentials' 
      });
    };

    // create a JWT token
    const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    
    res.json({ 
      success: true,
      message: 'Login successful',
      token,
    });

  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: 'Internal server error' });  
  }
});

export default router;