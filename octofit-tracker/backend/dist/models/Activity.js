import mongoose, { Document, Schema } from 'mongoose';
const ActivitySchema = new Schema({
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
}, {
    timestamps: true,
});
export default mongoose.model('Activity', ActivitySchema);
//# sourceMappingURL=Activity.js.map