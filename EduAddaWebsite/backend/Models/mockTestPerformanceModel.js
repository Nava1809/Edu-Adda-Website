const mongoose = require('mongoose');

const MockTestPerformanceSchema = new mongoose.Schema({
    userId: { type: String, required: true },  // This should be an email ID
    mockTestId: { type: mongoose.Schema.Types.ObjectId, ref: 'MockTest', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true }
});

module.exports = mongoose.model('MockTestPerformance', MockTestPerformanceSchema);
