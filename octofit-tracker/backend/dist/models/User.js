import mongoose, { Document, Schema } from 'mongoose';
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
}, {
    timestamps: true,
});
export default mongoose.model('User', UserSchema);
//# sourceMappingURL=User.js.map