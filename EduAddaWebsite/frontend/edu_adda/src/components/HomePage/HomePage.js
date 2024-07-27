import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import './HomePage.css';

const StyledContainer = styled(Container)({
  padding: '20px',
});

const SectionBox = styled(Box)({
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '40px',
});

const CenteredSectionBox = styled(SectionBox)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const StyledCard = styled(Card)({
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  margin: '20px 0',
});

const HomePage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from API
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  // Slick slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true, // Adjusts height of the slider container based on the active slide
  };

  return (
    <div className="background">
      <StyledContainer maxWidth="lg" className="home-container">
        <Navbar />
        <CenteredSectionBox className="intro-section">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to EduAdda
          </Typography>
          <Typography variant="h6" paragraph>
            Empowering UGC NET / SET aspirants with high-quality educational resources. We inspire academic excellence and lifelong learning.
          </Typography>
        </CenteredSectionBox>
        <Slider {...sliderSettings} className="slider-container">
          <div key="net-section" className="net-section">
            <SectionBox>
              <Typography variant="h4" component="h2" gutterBottom>
                Introduction to NET
              </Typography>
              <Typography variant="body1" paragraph>
                The UGC National Eligibility Test (NET) is a national-level examination conducted by the University Grants Commission (UGC) for determining the eligibility for lectureship and for the award of Junior Research Fellowship (JRF) in Indian universities and colleges. Our platform provides essential resources and mock tests tailored to help you succeed in the UGC NET exams. Prepare effectively with our comprehensive mock tests and weekly quizzes.
              </Typography>
              <blockquote>
                <Typography variant="body2">
                  "Success in the UGC NET / JRF exams opens doors to a world of academic opportunities. At EduAdda, we are dedicated to guiding you through every step of this journey." - EduAdda Team
                </Typography>
              </blockquote>
              <blockquote>
                <Typography variant="body2">
                  "With rigorous preparation and the right guidance, cracking the UGC NET / JRF becomes achievable. Our resources are tailored to provide you with the best possible preparation." - EduAdda Faculty
                </Typography>
              </blockquote>
            </SectionBox>
          </div>
          <div key="set-section" className="set-section">
            <SectionBox>
              <Typography variant="h4" component="h2" gutterBottom>
                About SET
              </Typography>
              <Typography variant="body1" paragraph>
                The State Eligibility Test (SET) is conducted at the state level and serves a similar purpose to the UGC NET. It qualifies candidates for lectureship positions in state-run colleges and universities. EduAdda offers specialized courses and mock tests to help you excel in the SET exams, providing comprehensive study material and practice tests.
              </Typography>
              <blockquote>
                <Typography variant="body2">
                  "EduAdda's structured approach to SET preparation ensures that you can tackle the exam with confidence and achieve your career goals." - EduAdda Mentor
                </Typography>
              </blockquote>
            </SectionBox>
          </div>
        </Slider>
        <SectionBox className="offer-section small-slider-container">
          <Typography variant="h4" component="h2" gutterBottom>
            What We Offer
          </Typography>
          <Slider {...sliderSettings} className="slider-container small-slider">
            <div key="courses">
              <Grid container spacing={4} className="card-container">
                <Grid item xs={12} md={12}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="h3">
                        Courses
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Explore our extensive range of courses designed to help you excel in UGC NET, JRF, and SET exams. Each course includes detailed study materials, video lectures, and practice questions.
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>
            </div>
            <div key="mock-tests">
              <Grid container spacing={4} className="card-container">
                <Grid item xs={12} md={12}>
                  <StyledCard>
                    <CardContent>
                      <Typography variant="h5" component="h3">
                        Mock Tests
                      </Typography>
                      <Typography variant="body1" paragraph>
                        Take our comprehensive mock tests to evaluate your preparation. Our mock tests are designed to simulate the actual exam environment and provide detailed feedback on your performance.
                      </Typography>
                    </CardContent>
                  </StyledCard>
                </Grid>
              </Grid>
            </div>
          </Slider>
        </SectionBox>
        <SectionBox className="courses-section">
          <Typography variant="h4" component="h2" gutterBottom>
            Our Courses
          </Typography>
          <Grid container spacing={4}>
            {courses.map(course => (
              <Grid item key={course.id} xs={12} sm={6} md={4}>
                <StyledCard className="course-card">
                  <CardContent>
                    <Typography variant="h5" component="h3">
                      {course.title}
                    </Typography>
                    <Typography variant="body1">
                      {course.description}
                    </Typography>
                    {/* Add more details as needed */}
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </SectionBox>
      </StyledContainer>
    </div>
  );
};

export default HomePage;
