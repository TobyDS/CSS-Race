import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CopyClipboardButton from '@components/CopyClipboardButton';
import Navbar from '@components/Navbar';
import UserStatus from '@components/UserStatus';
import darkTheme from '@data/darkTheme';
import socketFunctions from '@utils/useSocket';
import styles from './index.module.css';

function Room () {
  const [userIsReady, setUserIsReady] = useState(false);
  const [opponentIsReady, setOpponentIsReady] = useState();
  const [roomId, setRoomId] = useState('');
  const [startEnabled, setStartEnabled] = useState(false);
  const [image, setImage] = useState();
  const location = useLocation();
  const tabValue = location.state?.tabValue;
  const retrievedRoomId = location.state?.roomId || '';
  const isHost = tabValue === 'Create';

  const navigate = useNavigate();

  useEffect(() => {
    if (!tabValue) {
      navigate('/');
    }
  });

  // Custom hook
  socketFunctions.useSocket(
    isHost,
    setRoomId,
    setOpponentIsReady,
    userIsReady,
    retrievedRoomId,
    setStartEnabled,
    image,
    setImage
  );

  function handleGameStart () {
    socketFunctions.startGame();
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
            <CardActions sx={{ mb: 3, justifyContent: 'center' }}>
              {startEnabled ? (
                <Button variant='contained' onClick={handleGameStart}>
                  Start Game
                </Button>
              ) : (
                <Button variant='contained' disabled>
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
