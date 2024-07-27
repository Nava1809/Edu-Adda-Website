import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Button, Container, Typography, Select, MenuItem, FormControl, InputLabel, Card, CardContent, CardActions } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import './StudyMaterial.css';

function StudyMaterial() {
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [category, setCategory] = useState('All');

  const studyMaterialsData = useMemo(() => ({
    'Paper 1': [
      {
        title: 'Paper 1 - Jbl Teaching Aptitude',
        url: 'https://drive.google.com/file/d/124xY0p0wBITb17RB7G1hY5PRv-uAPjA0/view?usp=drive_link',
        format: 'pdf'
      },
      {
        title: 'Paper 1 - Topic 2',
        url: 'https://drive.google.com/file/d/1geqfy17DEQXrKxaxz4B0upI-zBJjBWU3/view?usp=drive_link',
        format: 'doc'
      }
    ],
    'Paper 2': [
      {
        title: 'Paper 2 - Topic 1',
        url: 'https://drive.google.com/file/d/your-file-id-3/view?usp=sharing',
        format: 'pdf'
      },
      {
        title: 'Paper 2 - Topic 2',
        url: 'https://drive.google.com/file/d/your-file-id-4/view?usp=sharing',
        format: 'doc'
      }
    ]
  }), []);

  const fetchStudyMaterials = useCallback(() => {
    let materials = [];
    if (category === 'All') {
      materials = [...studyMaterialsData['Paper 1'], ...studyMaterialsData['Paper 2']];
    } else {
      materials = studyMaterialsData[category];
    }
    setStudyMaterials(materials);
  }, [category, studyMaterialsData]);

  useEffect(() => {
    fetchStudyMaterials();
  }, [fetchStudyMaterials]);

  const handlePaperChange = (paper) => {
    setCategory(paper); // Set the category to the selected paper type
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Container className="study-material-container">
      <Navbar />
      <div className="heading-container">
        <Typography variant="h4">Study Materials</Typography>
      </div>
      <div className="controls-container">
        <Button variant="contained" onClick={() => handlePaperChange('Paper 1')} style={{ marginRight: '10px' }}>Paper 1</Button>
        <Button variant="contained" onClick={() => handlePaperChange('Paper 2')} style={{ marginRight: '10px' }}>Paper 2</Button>
        <FormControl variant="outlined" className="category-select">
          <InputLabel>Category</InputLabel>
          <Select value={category} onChange={handleCategoryChange} label="Category">
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Paper 1">Paper 1</MenuItem>
            <MenuItem value="Paper 2">Paper 2</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="cards-container">
        {studyMaterials.map((material, index) => (
          <Card key={index} className="study-material-card">
            <CardContent className="card-content">
              <Typography variant="h6" className="card-title">{material.title}</Typography>
            </CardContent>
            <CardActions className="card-actions">
              <Button size="small" color="primary" href={material.url} target="_blank" rel="noopener noreferrer">
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default StudyMaterial;
