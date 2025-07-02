import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prismaClient.js';
import { Gender } from '@prisma/client';

const router = express.Router()

/** @note routes here are unprotected */

// api/auth/validate
router.get('/validate', async (req, res) => {
  
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
     return res.status(401).json({ message: 'Authentication token is required' });
  };

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true });
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  };

});

// api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, fullname, birthdate, gender } = req.body;
  // salt = cost factor, determines how many times to run the hashing algorithm
  const saltRounds = 8;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  // optional: validate input
  if (!Object.values(Gender).includes(gender)) {
    return res.status(400).json({ message: 'Invalid Gender' });
  }
  // post new user
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
    // create a JWT token
    const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({token})
  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: 'Internal server error' });  
  };
});

// api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        username
      }
    });
    // if user not found, return error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    };
    // compare the password with the hashed password in the database
    const isMatch = bcrypt.compareSync(password, user.password);
    // if password does not match, return error
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    };
    // create a JWT token
    const token = jwt.sign({ id:user.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });

  } catch (error) {
    console.log(error.message);
    res.status(503).json({ message: 'Internal server error' });  
  };
});

export default router;