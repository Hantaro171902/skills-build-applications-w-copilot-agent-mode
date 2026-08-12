"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiConfig_1 = require("./config/apiConfig");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const activityRoutes_1 = __importDefault(require("./routes/activityRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit';
const API_BASE_URL = (0, apiConfig_1.getApiBaseUrl)();
const CORS_ORIGINS = (0, apiConfig_1.getCorsOrigins)();
// Middleware
app.use((0, cors_1.default)({
    origin: CORS_ORIGINS,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI);
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
app.use('/api/users', userRoutes_1.default);
app.use('/api/activities', activityRoutes_1.default);
// Start Server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`OctoFit Backend server running on port ${PORT}`);
        console.log(`API Base URL: ${API_BASE_URL}`);
        console.log(`CORS Origins: ${CORS_ORIGINS.join(', ')}`);
        console.log(`MongoDB connection: ${MONGODB_URI}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map