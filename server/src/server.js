import express from 'express';
import cors from 'cors';
import apiRoutes from './routes/apiRoutes.js'

// initializing express
const app = express();

// setup port
const PORT = process.env.PORT || 8080

// setup domain
const DOMAIN = process.env.DOMAIN || `http://localhost:${PORT}`

// middlewares
app.use(cors());
app.use(express.json());

// routes

app.use('/api', apiRoutes);

// listen to app
app.listen(PORT, () => {
  console.log(`Server is now running on ${DOMAIN}`);
});