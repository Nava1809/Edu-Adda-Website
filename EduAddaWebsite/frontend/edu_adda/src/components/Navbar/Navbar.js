import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Typography, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { isAuthenticated, HandleLogout, getUserID } from '../../helper/helper';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = getUserID();
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    HandleLogout();
    navigate('/');
  };

  return (
    <AppBar position="sticky" color="default">
      <Toolbar className="toolbar">
        <div className="logo-container" onClick={() => navigate('/HomePage')}>
          <img src="/eduAddalogo.jpg" alt="EduAdda Logo" className="logo-image" />
          <Typography variant="h6" component="div" className="logo-text">
            Edu Adda
          </Typography>
        </div>
        <div className="nav-buttons">
          <Button
            startIcon={<MenuBookIcon />}
            color="primary"
            onClick={() => navigate('/courses')}
          >
            Courses
          </Button>
          <Button
            startIcon={<QuizIcon />}
            color="primary"
            onClick={() => navigate('/mockTests')}
          >
            MockTests
          </Button>
          <Button
            startIcon={<MenuBookIcon />}
            color="primary"
            onClick={() => navigate('/StudyMaterials')}
          >
            Study Materials
          </Button>
          {isAuthenticated() ? (
            <div>
              <Tooltip title={username} arrow>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={() => navigate('/dashboard')}>Dashboard</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              color="primary"
              onClick={() => navigate('/')}
            >
              Login
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
