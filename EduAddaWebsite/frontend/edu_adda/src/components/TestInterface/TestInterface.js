import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardActions,
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    LinearProgress
} from '@mui/material';
import "./TestInterface.css";

const TestInterface = ({ test, userId }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [visitedQuestions, setVisitedQuestions] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(3600); // Example: 1 hour for the test
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const url = process.env.REACT_APP_API;

    const handleAnswerChange = (event) => {
        setAnswers({ ...answers, [currentQuestionIndex]: event.target.value });
        setVisitedQuestions({ ...visitedQuestions, [currentQuestionIndex]: true });
    };

    const handleNextQuestion = () => {
        let nextIndex = currentQuestionIndex + 1;
        while (nextIndex < test.questions.length && visitedQuestions[nextIndex]) {
            nextIndex++;
        }
        setCurrentQuestionIndex(nextIndex);
    };

    const handlePreviousQuestion = () => {
        let prevIndex = currentQuestionIndex - 1;
        while (prevIndex >= 0 && visitedQuestions[prevIndex]) {
            prevIndex--;
        }
        setCurrentQuestionIndex(prevIndex);
    };

    const calculateScore = useCallback(() => {
        let correctAnswers = 0;
        test.questions.forEach((question, index) => {
            if (answers[index] === question.correctAnswer) {
                correctAnswers += 1;
            }
        });
        return correctAnswers;
    }, [answers, test.questions]);

    const handleSubmitTest = useCallback(async () => {
        const score = calculateScore();
        setScore(score);
        setSubmitted(true);

        const payload = {
            userId,
            mockTestId: test._id,
            score,
            totalQuestions: test.questions.length,
        };

        try {
            const response = await fetch(`${url}/api/mocktest-performance`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`);
            }

            const result = await response.json();
            console.log('Server response:', result);
        } catch (error) {
            console.error('Error saving performance data:', error.message);
        }
    }, [calculateScore, test, userId, url]);

    useEffect(() => {
        if (!submitted && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeRemaining === 0 && !submitted) {
            handleSubmitTest();
        }
    }, [submitted, timeRemaining, handleSubmitTest]);

    if (submitted) {
        return (
            <Container className="result-container">
                <Card className="result-card">
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>Test Result</Typography>
                        <Typography variant="h6">Your score: {score} / {test.questions.length}</Typography>
                        <Typography variant="body1">You attempted {Object.keys(answers).length} out of {test.questions.length} questions.</Typography>
                        <Typography variant="body1">User ID: {userId}</Typography>
                    </CardContent>
                </Card>
            </Container>
        );
    }

    const question = test.questions[currentQuestionIndex];

    return (
        <Container className="test-interface-container">
            <Typography variant="h4" component="h1" gutterBottom>{test.title}</Typography>
            <Typography variant="h6" component="p">User ID: {userId}</Typography>
            <LinearProgress variant="determinate" value={((3600 - timeRemaining) / 3600) * 100} />
            <Typography variant="body1" className="timer">
                Time Remaining: {Math.floor(timeRemaining / 60)}:{String(timeRemaining % 60).padStart(2, '0')}
            </Typography>
            
            {/* Display visited/unvisited question indicators */}
            <div className="question-status">
                <Typography variant="h6" component="h2">Question Status:</Typography>
                {test.questions.map((_, index) => (
                    <Button
                        key={index}
                        variant="outlined"
                        className={`status-button ${visitedQuestions[index] ? 'visited' : 'unvisited'}`}
                        onClick={() => setCurrentQuestionIndex(index)}
                        disabled={visitedQuestions[index]}
                    >
                        {index + 1}
                    </Button>
                ))}
            </div>

            <Card className="question-card">
                <CardContent>
                    {question.image && <img src={question.image} alt="question" className="question-image" />}
                    <Typography variant="h6" component="p">{question.question}</Typography>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Options</FormLabel>
                        <RadioGroup
                            aria-label="options"
                            name={`question-${currentQuestionIndex}`}
                            value={answers[currentQuestionIndex] || ''}
                            onChange={handleAnswerChange}
                        >
                            {question.options.map((option, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                    disabled={submitted}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </CardContent>
                <CardActions className="navigation-buttons">
                    <Button onClick={handlePreviousQuestion} variant="contained">Previous</Button>
                    <Button onClick={handleNextQuestion} variant="contained">Next</Button>
                    <Button onClick={handleSubmitTest} variant="contained" color="primary">Finish Test</Button>
                </CardActions>
            </Card>
        </Container>
    );
};

export default TestInterface;

