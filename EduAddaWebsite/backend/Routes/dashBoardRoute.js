const express = require('express');
const router = express.Router();
const Dashboard = require('../Models/dashBoardModel');
const MockTest = require('../Models/mockTestModel');

router.get('/dashboard/:userId', async (req, res) => {
    const { userId } = req.params;

    console.log(`Fetching dashboard for userId: ${userId}`);

    try {
        const dashboardData = await Dashboard.findOne({ user: userId });

        if (dashboardData) {
            const mockTestPerformances = await Promise.all(dashboardData.mockTestPerformances.map(async (performance) => {
                const mockTest = await MockTest.findOne({ title: performance.mockTestTitle });
                return {
                    ...performance,
                    mockTest
                };
            }));

            res.json({ ...dashboardData._doc, mockTestPerformances });
        } else {
            console.log(`No dashboard found for userId: ${userId}`);
            res.status(404).json({ message: 'Dashboard not found' });
        }
    } catch (error) {
        console.error('Error fetching dashboard data:', error.message);
        res.status(500).json({ error: 'Error fetching dashboard data', details: error.message });
    }
});

module.exports = router;
