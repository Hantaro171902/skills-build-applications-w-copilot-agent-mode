"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const getUsers = async (req, res) => {
    try {
        const users = await User_1.default.find();
        res.json({ success: true, data: users });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch users' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
            return;
        }
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch user' });
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
            res.status(400).json({ success: false, error: 'Username and email are required' });
            return;
        }
        const newUser = new User_1.default({ username, email });
        await newUser.save();
        res.status(201).json({ success: true, data: newUser });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ success: false, error: 'Username or email already exists' });
            return;
        }
        res.status(500).json({ success: false, error: 'Failed to create user' });
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const user = await User_1.default.findByIdAndUpdate(req.params.id, { username, email }, { new: true, runValidators: true });
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
            return;
        }
        res.json({ success: true, data: user });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update user' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ success: false, error: 'User not found' });
            return;
        }
        res.json({ success: true, message: 'User deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete user' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map