import React, { useState, useEffect } from 'react';

const CourseDetailsPage = ({ match }) => {
    const [course, setCourse] = useState(null);
    const courseId = match.params.id; // Assuming React Router for fetching course ID

    useEffect(() => {
        // Fetch course details based on courseId from API
        fetch(`/api/courses/${courseId}`)
            .then(response => response.json())
            .then(data => setCourse(data))
            .catch(error => console.error(`Error fetching course ${courseId}:`, error));
    }, [courseId]);

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Course Details</h1>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            {/* Render more details */}
        </div>
    );
};

export default CourseDetailsPage;
