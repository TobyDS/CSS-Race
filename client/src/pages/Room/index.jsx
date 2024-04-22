import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
} from '@mui/material';

import Navbar from '@components/Navbar';
import UserStatus from '@components/UserStatus';
import CopyClipboardButton from '@components/copyClipboardButton';
import darkTheme from '@data/darkTheme';
import useSocket from '@utils/useSocket';
import styles from './index.module.css';

function Room () {
  const [userIsReady, setUserIsReady] = useState(false);
  const [opponentIsReady, setOpponentIsReady] = useState();
  const [roomId, setRoomId] = useState('');
  const [startEnabled, setStartEnabled] = useState(false);
  const location = useLocation();
  const tabValue = location.state?.tabValue || 'Create';
  const retrievedRoomId = location.state?.roomId || '';
  const isHost = tabValue === 'Create';

  // Custom hook
  useSocket(
    isHost,
    setRoomId,
    setOpponentIsReady,
    userIsReady,
    retrievedRoomId,
    setStartEnabled
  );

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
                  isUser={isHost ? false : true}
                  isReady={isHost ? opponentIsReady : userIsReady}
                  setIsReady={setUserIsReady}
                />
              </div>
            </CardContent>
            <CardActions
              container
              sx={{ mb: 3, mt: -0.5, justifyContent: 'center' }}
            >
              {startEnabled ? (
                <Button item variant='contained'>
                  Start Game
                </Button>
              ) : (
                <Button item variant='contained' disabled>
                  Start Game
                </Button>
              )}
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Room;
