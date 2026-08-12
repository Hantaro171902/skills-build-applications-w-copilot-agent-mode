import type { Request, Response } from 'express';
import User from '../models/User.js';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body;

    if (!username || !email) {
      res.status(400).json({ success: false, error: 'Username and email are required' });
      return;
    }

    const newUser = new User({ username, email });
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).json({ success: false, error: 'Username or email already exists' });
      return;
    }
    res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email },
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update user' });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete user' });
  }
};
