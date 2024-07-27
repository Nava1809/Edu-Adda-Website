const express = require('express');
const MockTest = require('../Models/mockTestModel');
const router = express.Router();

// Create a new mock test
router.post('/mocktests', async (req, res) => {
    try {
        const mockTest = new MockTest(req.body);
        await mockTest.save();
        res.status(201).json(mockTest);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error
            res.status(400).json({ error: 'Mock Test title must be unique' });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
});

// Get all mock tests
router.get('/mocktests', async (req, res) => {
    try {
        const mockTests = await MockTest.find();
        res.status(200).json(mockTests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single mock test by ID
router.get('/mocktests/:id', async (req, res) => {
    try {
        const mockTest = await MockTest.findById(req.params.id);
        if (!mockTest) {
            return res.status(404).json({ error: 'Mock Test not found' });
        }
        res.status(200).json(mockTest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a specific question within a mock test by IDs
router.put('/mocktests/:testId/questions/:questionId', async (req, res) => {
    const { testId, questionId } = req.params;
    const { question, options, correctAnswer, image } = req.body;

    try {
        const mockTest = await MockTest.findById(testId);
        if (!mockTest) {
            return res.status(404).json({ error: 'Mock Test not found' });
        }

        const questionToUpdate = mockTest.questions.id(questionId);
        if (!questionToUpdate) {
            return res.status(404).json({ error: 'Question not found' });
        }

        questionToUpdate.question = question || questionToUpdate.question;
        questionToUpdate.options = options || questionToUpdate.options;
        questionToUpdate.correctAnswer = correctAnswer || questionToUpdate.correctAnswer;
        if (image) {
            questionToUpdate.image = image;
        }

        await mockTest.save();
        res.status(200).json(mockTest);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a mock test by ID
router.delete('/mocktests/:id', async (req, res) => {
    try {
        const mockTest = await MockTest.findByIdAndDelete(req.params.id);
        if (!mockTest) {
            return res.status(404).json({ error: 'Mock Test not found' });
        }
        res.status(200).json({ message: 'Mock Test deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
