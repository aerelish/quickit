import express from 'express';
import cors from 'cors';
import morgan from 'morgan'
import apiRoutes from './routes/apiRoutes.js'

// initializing express
const app = express();

// setup port
const PORT = process.env.PORT || 8080

// middlewares
app.use(cors());                // for cross-origin resource sharing for all routes
app.use(morgan('combined'));    // log incoming http requests
app.use(express.json());        // parse incoming requests with JSON payloads

// routes
app.use('/api', apiRoutes);

// listen to app
app.listen(PORT, () => {
  console.log(`Server is now running on PORT:${PORT}`);
});