import React from 'react';
import { Button, Typography, Box } from '@mui/material-nextjs';

const HomePage = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to Our App
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        Discover amazing features and boost your productivity
      </Typography>
      <Button variant="contained" size="large">
        Get Started
      </Button>
    </Box>
  );
};

export default HomePage;