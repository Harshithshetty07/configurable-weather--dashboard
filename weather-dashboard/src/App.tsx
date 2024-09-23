import React from 'react';
import { CssBaseline, Container, Typography } from '@mui/material';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Weather Dashboard
        </Typography>
        <Dashboard />
      </Container>
    </>
  );
};

export default App;