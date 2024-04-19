import React from 'react';
import Navbar from '@components/Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
} from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';

import styles from './index.module.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

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
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    variant='fullWidth'
                    onChange={handleChange}
                    aria-label='lab API tabs example'
                  >
                    <Tab label='Join a Game' value='1' />
                    <Tab label='Create a New Game' value='2' />
                  </TabList>
                </Box>
                <TabPanel value='1' sx={{ p: 0, m: 0, height: '250px' }}>
                  <Card sx={{ minWidth: 500, height: '100%' }}>
                    <CardContent sx={{ height: '100%' }}>
                      <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-evenly'
                        height='100%'
                      >
                        <Typography variant='h5' color='text.primary'>
                          Enter Room ID to join a game
                        </Typography>
                        <TextField
                          label='Room ID'
                          variant='outlined'
                          sx={{ width: '300px', marginTop: '-10px' }}
                        />
                        <Button
                          variant='contained'
                          color='primary'
                          sx={{ mt: 2 }}
                        >
                          Join Room
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </TabPanel>
                <TabPanel value='2' sx={{ p: 0, m: 0, height: '250px' }}>
                  <Card sx={{ minWidth: 500, height: '100%' }}>
                    <CardContent sx={{ height: '100%' }}>
                      <Box
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='space-evenly'
                        height='100%'
                      >
                        <Typography variant='h5' color='text.primary'>
                          Create a new game
                        </Typography>
                        <Button variant='contained' color='primary'>
                          Create Room
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Dashboard;
