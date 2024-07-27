const mongoose = require('mongoose');

const DashboardSchema = new mongoose.Schema({
    user: { type: String, required: true },  // This should be an email ID
    mockTestPerformances: [{
        mockTestTitle: { type: String, required: true },
        score: Number,
        dateTaken: Date
    }]
});

module.exports = mongoose.model('Dashboard', DashboardSchema);
