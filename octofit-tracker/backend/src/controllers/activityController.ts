import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity.js';

export const getActivities = async (req: Request, res: Response): Promise<void> => {
  try {
    const activities = await Activity.find().populate('userId', 'username email');
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch activities' });
  }
};

export const getActivitiesByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userIdParam = Array.isArray(req.params.userId) ? req.params.userId[0] : req.params.userId;
    if (!userIdParam) {
      res.status(400).json({ success: false, error: 'Invalid userId' });
      return;
    }
    const userId = new mongoose.Types.ObjectId(userIdParam);
    const activities = await Activity.find({ userId }).populate('userId', 'username email');
    res.json({ success: true, data: activities });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch activities' });
  }
};

export const getActivityById = async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findById(req.params.id).populate('userId', 'username email');
    if (!activity) {
      res.status(404).json({ success: false, error: 'Activity not found' });
      return;
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch activity' });
  }
};

export const createActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, activityType, duration, date, notes } = req.body;

    if (!userId || !activityType || !duration) {
      res.status(400).json({ success: false, error: 'userId, activityType, and duration are required' });
      return;
    }

    const newActivity = new Activity({
      userId,
      activityType,
      duration,
      date: date || new Date(),
      notes,
    });
    await newActivity.save();
    await newActivity.populate('userId', 'username email');
    res.status(201).json({ success: true, data: newActivity });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create activity' });
  }
};

export const updateActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activityType, duration, date, notes } = req.body;
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      { activityType, duration, date, notes },
      { new: true, runValidators: true }
    ).populate('userId', 'username email');
    if (!activity) {
      res.status(404).json({ success: false, error: 'Activity not found' });
      return;
    }
    res.json({ success: true, data: activity });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update activity' });
  }
};

export const deleteActivity = async (req: Request, res: Response): Promise<void> => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity) {
      res.status(404).json({ success: false, error: 'Activity not found' });
      return;
    }
    res.json({ success: true, message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete activity' });
  }
};
