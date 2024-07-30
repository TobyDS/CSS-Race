import { Box, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';

import Navbar from '@components/Navbar';
import Tabs from '@components/Tabs';
import darkTheme from '@data/darkTheme';

function Dashboard () {
  const [selectedTab, setSelectedTab] = useState('1');

  function handleChange (_event, newValue) {
    setSelectedTab(newValue);
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
              <Tabs value={selectedTab} onChange={handleChange} />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Dashboard;
