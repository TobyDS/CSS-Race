import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CopyClipboardButton from '@components/CopyClipboardButton';
import Navbar from '@components/Navbar';
import UserStatus from '@components/UserStatus';
import useStore from '@store/useStore';
import useSocketEvents from '@hooks/useSocketEvents';
import styles from './index.module.css';

function Room () {
  const {
    userReady,
    setUserReady,
    opponentReady,
    roomId,
    setRoomId,
    startEnabled,
  } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  const tabValue = location.state?.tabValue;
  const retrievedRoomId = location.state?.roomId || '';
  const isHost = tabValue === 'Create';

  useSocketEvents(isHost);

  useEffect(() => {
    if (!tabValue) {
      navigate('/');
    } else if (!roomId && retrievedRoomId) {
      setRoomId(retrievedRoomId);
    }
  }, [tabValue, roomId, retrievedRoomId, setRoomId, navigate]);

  function handleGameStart () {
    useSocketEvents.startGame();
  }

  return (
    <>
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
                  isReady={isHost ? userReady : opponentReady}
                  setIsReady={setUserReady}
                />
                <Divider orientation='vertical' flexItem />
                <UserStatus
                  playerNum={2}
                  isHost={isHost}
                  isUser={isHost ? false : true}
                  isReady={isHost ? opponentReady : userReady}
                  setIsReady={setUserReady}
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
    </>
  );
}

export default Room;
