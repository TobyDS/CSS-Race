import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CopyClipboardButton from '@components/CopyClipboardButton';
import Navbar from '@components/Navbar';
import UserStatus from '@components/UserStatus';
import useGameStore from '@store/useGameStore';
import useSocket from '@hooks/useSocket';
import { handleGameStart } from '@utils/socketEmitHandlers';
import styles from './index.module.css';

function Room () {
  const { roomId, setRoomId, startEnabled, isHost, setIsHost } = useGameStore();
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useSocket();

  const tabValue = useRef(location.state?.tabValue);
  const retrievedRoomId = location.state?.roomId || '';

  useEffect(() => {
    if (!tabValue.current) {
      navigate('/');
    } else {
      if (!roomId && retrievedRoomId) {
        setRoomId(retrievedRoomId);
      }
      if (tabValue.current === 'Create') {
        setIsHost(true);
      } else {
        setIsHost(false);
      }
    }
  }, [tabValue, roomId, setIsHost, retrievedRoomId, setRoomId, navigate]);

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
                <UserStatus isLocalUser={isHost} />
                <Divider orientation='vertical' flexItem />
                <UserStatus isLocalUser={!isHost} />
              </div>
            </CardContent>
            <CardActions sx={{ mb: 3, justifyContent: 'center' }}>
              {startEnabled ? (
                <Button
                  variant='contained'
                  onClick={() => handleGameStart(socket)}
                >
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
