import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, CardActions, Button, Typography, Pagination, Dialog, DialogTitle, DialogContent, DialogActions, FormControlLabel, Checkbox } from '@mui/material';
import TestInterface from '../TestInterface/TestInterface';
import Navbar from '../Navbar/Navbar';
import './MockTestsInterface.css';

// Function to retrieve user ID from localStorage
const getUserID = () => {
    const user = localStorage.getItem('user');
    if (user) {
        try {
            const parsedUser = JSON.parse(user);
            return parsedUser.email || parsedUser.phone || user; // Fallback to plain string if JSON parsing fails
        } catch (e) {
            console.error("Failed to parse user data as JSON, returning as-is:", e);
            return user; // Return as plain string if parsing fails
        }
    }
    return '';
};

const MockTests = () => {
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState(null);
    const [showInstructions, setShowInstructions] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [isTestStarted, setIsTestStarted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const testsPerPage = 5;

    useEffect(() => {
        // Fetch mock tests from API
        fetch('http://localhost:5000/api/mocktests')
            .then(response => response.json())
            .then(data => setTests(data))
            .catch(error => console.error('Error fetching mock tests:', error));
    }, []);

    const handleStartTest = (test) => {
        setSelectedTest(test);
        setShowInstructions(true);
        setIsTestStarted(false);
    };

    const handleAcceptTerms = () => {
        setAcceptedTerms(!acceptedTerms);
    };

    const handleBeginTest = (event) => {
        event.stopPropagation();
        if (acceptedTerms) {
            setShowInstructions(false);
            setIsTestStarted(true);
        } else {
            alert("You must accept the terms and conditions to start the test.");
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const indexOfLastTest = currentPage * testsPerPage;
    const indexOfFirstTest = indexOfLastTest - testsPerPage;
    const currentTests = tests.slice(indexOfFirstTest, indexOfLastTest);

    // Fetch user details from localStorage
    const userId = getUserID(); // Fetch user ID using the updated function

    if (selectedTest && isTestStarted) {
        return <TestInterface test={selectedTest} userId={userId} />;
    }

    return (
        <Container className="container">
            <Navbar className="navbar" />
            <Typography variant="h4" component="h1" className="heading">Mock Tests</Typography>
            <div className="test-cards">
                {currentTests.map(test => (
                    <Card key={test._id} className="card">
                        <CardContent>
                            <Typography variant="h5" component="h2" align="center">{test.title}</Typography>
                        </CardContent>
                        <CardActions style={{ justifyContent: 'center' }}>
                            <Button size="small" color="primary" onClick={() => handleStartTest(test)}>Start Test</Button>
                        </CardActions>
                    </Card>
                ))}
            </div>

            <Pagination
                count={Math.ceil(tests.length / testsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
            />

            <Dialog open={showInstructions} onClose={() => setShowInstructions(false)}>
                <DialogTitle>Instructions</DialogTitle>
                <DialogContent>
                    <Typography>Please read the instructions carefully before starting the test.</Typography>
                    <ul>
                        <li>Ensure a stable internet connection.</li>
                        <li>Read each question carefully before answering.</li>
                        <li>Do not refresh the page during the test.</li>
                    </ul>
                    <FormControlLabel
                        control={
                            <Checkbox checked={acceptedTerms} onChange={handleAcceptTerms} />
                        }
                        label="I accept the terms and conditions"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleBeginTest} color="primary">Begin Test</Button>
                    <Button onClick={() => setShowInstructions(false)} color="secondary">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default MockTests;
