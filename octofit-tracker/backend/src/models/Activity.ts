import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId;
  activityType: string;
  duration: number; // in minutes
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ['run', 'walk', 'cycling', 'swimming', 'gym', 'yoga', 'other'],
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);
