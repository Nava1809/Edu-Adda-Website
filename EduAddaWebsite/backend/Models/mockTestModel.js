const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    image: {
        type: String, 
        required: false 
    }
});

const mockTestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    questions: {
        type: [questionSchema],
        required: true
    }
});

const MockTest = mongoose.model('MockTest', mockTestSchema);

module.exports = MockTest;
