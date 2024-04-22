import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import { ThemeProvider } from '@mui/material/styles';
import {
  Card,
  CardContent,
  Divider,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';

import Navbar from '@components/Navbar';
import UserStatus from '@components/UserStatus';
import CopyClipboardButton from '@components/copyClipboardButton';
import darkTheme from '@data/darkTheme';
import styles from './index.module.css';

const SOCKET_SERVER_URL =
  import.meta.VITE_SOCKET_SERVER_URL || 'http://localhost:3000';

// TODO: DELETE THIS: This is just a placeholder for the user status
const isHost = true;

function Room () {
  const [userIsReady, setUserIsReady] = useState(false);
  const [opponentIsReady, setOpponentIsReady] = useState();
  const [roomId, setRoomId] = useState('');
  const location = useLocation();
  const tabValue = location.state?.tabValue || 'Create';

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);
    socket.on('connect', () => {
      console.log('Connected to server');

      // Send the 'create_room' event
      socket.emit('create_room', { tabValue });

      // Listen for the 'room_id' event
      socket.on('room_id', (retRoomId) => {
        setRoomId(retRoomId);
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [tabValue]);

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
                <CopyClipboardButton roomId={roomId} />
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
