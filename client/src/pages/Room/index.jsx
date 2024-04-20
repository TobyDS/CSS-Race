import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UserStatus from '@components/UserStatus';
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
import { Divider } from '@mui/material';

// TODO: DELETE THIS: This is just a placeholder for the user status
const isHost = true;
const roomID = '123456';

function Room () {
  const [userIsReady, setUserIsReady] = useState(false);
  const [opponentIsReady, setOpponentIsReady] = useState();

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
                  {roomID}
                </Typography>
                <IconButton aria-label='copy' color='primary'>
                  <ContentCopyIcon />
                </IconButton>
              </div>
              <div className={styles.usersContainer}>
                <UserStatus
                  playerNum={1}
                  isHost={isHost}
                  isUser={isHost ? true : false}
                  isReady={isHost ? userIsReady : opponentIsReady}
                  setIsReady={setUserIsReady}
                />
                <Divider orientation='vertical' flexItem />
                <UserStatus
                  playerNum={2}
                  isHost={isHost}
                  isUser={!isHost ? true : false}
                  isReady={!isHost ? userIsReady : opponentIsReady}
                  setIsReady={setUserIsReady}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Room;
