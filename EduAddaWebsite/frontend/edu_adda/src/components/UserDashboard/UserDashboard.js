import React, { useEffect, useState } from 'react';
import { getUserID } from '../../helper/helper'; // Ensure correct import path
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'; // Required for Chart.js v3
import { Container, Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';
import './UserDashboard.css';
import Navbar from '../Navbar/Navbar';

const UserDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const userId = getUserID();
            console.log("User ID:", userId); // Debug: Check if userId is being retrieved correctly

            if (!userId) {
                console.error("User ID is undefined or not available.");
                setError("User ID is not available.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/dashboard/${encodeURIComponent(userId)}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("Dashboard data:", data); // Debug: Check if data is fetched correctly
                    setDashboardData(data);
                } else {
                    console.error("Failed to fetch dashboard data:", response.status);
                    setError("Failed to fetch dashboard data.");
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                setError("Error fetching dashboard data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return <Typography variant="h6" color="error">Error: {error}</Typography>;
    }

    const calculateAverageScores = (performances) => {
        const mockTestScores = {};

        performances.forEach((performance) => {
            const mockTestTitle = performance.mockTest ? performance.mockTest.title : 'Not Available';
            if (!mockTestScores[mockTestTitle]) {
                mockTestScores[mockTestTitle] = [];
            }
            mockTestScores[mockTestTitle].push(performance.score);
        });

        const averageScores = Object.keys(mockTestScores).map((title) => {
            const scores = mockTestScores[title];
            const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
            return { title, averageScore };
        });

        return averageScores;
    };

    const averageScores = calculateAverageScores(dashboardData.mockTestPerformances);

    const generateColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(`hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`);
        }
        return colors;
    };

    const chartData = {
        labels: averageScores.map(item => item.title),
        datasets: [
            {
                label: 'Average Scores',
                data: averageScores.map(item => item.averageScore),
                backgroundColor: generateColors(averageScores.length),
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Container className="dashboard-container">
            <Navbar/>
            <Typography className='Heading' variant="h4" gutterBottom>
                User Dashboard
            </Typography>
            {dashboardData ? (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Mock Test Performances
                    </Typography>
                    <Box className="chart-container">
                        <Pie data={chartData} options={chartOptions} />
                    </Box>
                    <List className="performance-list">
                        {dashboardData.mockTestPerformances.map((performance) => (
                            <ListItem key={performance._id} component={Paper} className="performance-item">
                                <ListItemText
                                    primary={`Mock Test Title: ${performance.mockTest ? performance.mockTest.title : 'Not Available'}`}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Score: {performance.score}
                                            </Typography>
                                            <br />
                                            <Typography component="span" variant="body2" color="textPrimary">
                                                Date Taken: {new Date(performance.dateTaken).toLocaleDateString()}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ) : (
                <Typography variant="body1">No data available.</Typography>
            )}
        </Container>
    );
};

export default UserDashboard;
