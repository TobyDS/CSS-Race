import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { ThemeProvider } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UserStatus from '@components/UserStatus';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';

import Navbar from '@components/Navbar';
import darkTheme from '@data/darkTheme';
import styles from './index.module.css';
const SOCKET_SERVER_URL =
  import.meta.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

// TODO: DELETE THIS: This is just a placeholder for the user status
const isHost = true;
const roomID = '123456';

function Room () {
  const [userIsReady, setUserIsReady] = useState(false);
  const [opponentIsReady, setOpponentIsReady] = useState();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state.referrer);
    const socket = io(SOCKET_SERVER_URL);
    socket.on('connect', () => {
      console.log('Connected to server');
    });
    socket.on('opponentReady', () => {
      setOpponentIsReady(true);
    });
    socket.on('opponentNotReady', () => {
      setOpponentIsReady(false);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

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
