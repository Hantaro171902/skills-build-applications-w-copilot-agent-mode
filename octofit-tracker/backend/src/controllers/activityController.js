"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityById = exports.getActivitiesByUser = exports.getActivities = void 0;
const Activity_1 = __importDefault(require("../models/Activity"));
const getActivities = async (req, res) => {
    try {
        const activities = await Activity_1.default.find().populate('userId', 'username email');
        res.json({ success: true, data: activities });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch activities' });
    }
};
exports.getActivities = getActivities;
const getActivitiesByUser = async (req, res) => {
    try {
        const activities = await Activity_1.default.find({ userId: req.params.userId }).populate('userId', 'username email');
        res.json({ success: true, data: activities });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch activities' });
    }
};
exports.getActivitiesByUser = getActivitiesByUser;
const getActivityById = async (req, res) => {
    try {
        const activity = await Activity_1.default.findById(req.params.id).populate('userId', 'username email');
        if (!activity) {
            res.status(404).json({ success: false, error: 'Activity not found' });
            return;
        }
        res.json({ success: true, data: activity });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch activity' });
    }
};
exports.getActivityById = getActivityById;
const createActivity = async (req, res) => {
    try {
        const { userId, activityType, duration, date, notes } = req.body;
        if (!userId || !activityType || !duration) {
            res.status(400).json({ success: false, error: 'userId, activityType, and duration are required' });
            return;
        }
        const newActivity = new Activity_1.default({
            userId,
            activityType,
            duration,
            date: date || new Date(),
            notes,
        });
        await newActivity.save();
        await newActivity.populate('userId', 'username email');
        res.status(201).json({ success: true, data: newActivity });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to create activity' });
    }
};
exports.createActivity = createActivity;
const updateActivity = async (req, res) => {
    try {
        const { activityType, duration, date, notes } = req.body;
        const activity = await Activity_1.default.findByIdAndUpdate(req.params.id, { activityType, duration, date, notes }, { new: true, runValidators: true }).populate('userId', 'username email');
        if (!activity) {
            res.status(404).json({ success: false, error: 'Activity not found' });
            return;
        }
        res.json({ success: true, data: activity });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to update activity' });
    }
};
exports.updateActivity = updateActivity;
const deleteActivity = async (req, res) => {
    try {
        const activity = await Activity_1.default.findByIdAndDelete(req.params.id);
        if (!activity) {
            res.status(404).json({ success: false, error: 'Activity not found' });
            return;
        }
        res.json({ success: true, message: 'Activity deleted' });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to delete activity' });
    }
};
exports.deleteActivity = deleteActivity;
//# sourceMappingURL=activityController.js.map