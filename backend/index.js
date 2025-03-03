import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';

dotenv.config({});

connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use('/api/v1/user', userRouter);

app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});