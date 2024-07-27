const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        sparse: true, // This allows either email or phone number to be unique but nullable
        trim: true,
        lowercase: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        sparse: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
    progress: {
        type: Map,
        of: Number,
        default: {}
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
