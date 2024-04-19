import React from 'react';
import Navbar from '@components/Navbar';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Typography, Grid } from '@mui/material';

import darkTheme from '@data/darkTheme';

import styles from './index.module.css';
import Tabs from '@components/Tabs';

function Dashboard () {
  const [value, setValue] = React.useState('1');

  function handleChange (event, newValue) {
    setValue(newValue);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container alignItems='flex-start' minHeight='100vh'>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid
          container
          item
          height='100%'
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <Grid item>
            <Typography variant='h2' color='text.primary'>
              Welcome to CSS Race
            </Typography>
            <Box sx={{ minWidth: 500, typography: 'body1' }}>
              <Tabs value={value} onChange={handleChange} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Dashboard;
