import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { getApiBaseUrl, getCorsOrigins } from './config/apiConfig.js';
import userRoutes from './routes/userRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
dotenv.config();
const app = express();
const PORT = 8000;
const HOST = '0.0.0.0';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit';
const API_BASE_URL = getApiBaseUrl();
const CORS_ORIGINS = getCorsOrigins();
// Middleware
app.use(cors({
    origin: CORS_ORIGINS,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};
// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running', apiBaseUrl: API_BASE_URL });
});
// API Routes
app.use('/api/users', userRoutes);
app.use('/api/activities', activityRoutes);
// Start Server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, HOST, () => {
        console.log(`OctoFit Backend server running on port ${PORT}`);
        console.log(`API Base URL: ${API_BASE_URL}`);
        console.log(`CORS Origins: ${CORS_ORIGINS.join(', ')}`);
        console.log(`MongoDB connection: ${MONGODB_URI}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map