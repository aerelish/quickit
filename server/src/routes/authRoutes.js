import express from 'express';
import bcrypt from 'bcryptjs'
import prisma from '../prismaClient.js';

const router = express.Router()
