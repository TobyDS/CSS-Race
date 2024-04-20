import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';

import Navbar from '@components/Navbar';
import darkTheme from '@data/darkTheme';

import styles from './index.module.css';

function Room () {
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
          <Card sx={{ minWidth: 550, height: '100%' }}>
            <CardContent>
              <div className={styles.flexRow}>
                <Typography variant='h5' color='text.primary'>
                  Room ID:
                </Typography>
                <Typography variant='h5' color='text.primary'>
                  123456
                </Typography>
                <IconButton aria-label='copy' color='primary'>
                  <ContentCopyIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Room;
