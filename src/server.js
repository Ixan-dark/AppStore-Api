import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import appRoutes from '../Routes/appRoutes.js';
import { dbConnect } from '../dbConnect/dbConnect.js';

dotenv.config();


const app = express();
const PORT = 3000;

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// Routes setup
app.use('/api/apps',appRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
    dbConnect();
});