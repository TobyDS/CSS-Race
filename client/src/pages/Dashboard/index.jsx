import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

import Navbar from '@components/Navbar';
import Tabs from '@components/Tabs';
import darkTheme from '@data/darkTheme';

import styles from './index.module.css';

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
