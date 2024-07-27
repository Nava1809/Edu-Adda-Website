const express = require('express');
const router = express.Router();
const MockTestPerformance = require('../Models/mockTestPerformanceModel');
const MockTest = require('../Models/mockTestModel');
const Dashboard = require('../Models/dashBoardModel');

// POST route to save mock test performance
router.post('/mocktest-performance', async (req, res) => {
    const { userId, mockTestTitle, score, totalQuestions } = req.body;

    console.log('Received request:', req.body);

    try {
        // Validate if mockTestTitle exists
        const mockTest = await MockTest.findOne({ title: mockTestTitle });
        if (!mockTest) {
            return res.status(400).json({ error: 'Mock test title does not exist' });
        }

        // Create new performance entry
        const newPerformance = new MockTestPerformance({
            userId,  // Ensure this is an email ID
            mockTestTitle,
            score,
            totalQuestions
        });

        await newPerformance.save();
        console.log('Performance saved:', newPerformance);

        // Prepare data for dashboard update
        const dashboardUpdate = {
            mockTestTitle,
            score,
            dateTaken: new Date()
        };

        // Update or create the dashboard entry
        const updatedDashboard = await Dashboard.findOneAndUpdate(
            { user: userId },  // Ensure user ID is an email ID
            { $push: { mockTestPerformances: dashboardUpdate } },
            { upsert: true, new: true }
        );

        console.log('Dashboard updated:', updatedDashboard);

        res.status(201).json({ message: 'Performance saved successfully' });
    } catch (error) {
        console.error('Error:', error.stack);
        res.status(500).json({ error: 'Error saving performance data' });
    }
});

module.exports = router;
