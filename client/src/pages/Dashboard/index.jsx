import React from 'react';
import Navbar from '@components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material';

import styles from './index.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Dashboard () {
  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />
      <Container maxWidth='lg'>
        <h1>Dashboard</h1>
      </Container>
    </ThemeProvider>
  );
}

export default Dashboard;
