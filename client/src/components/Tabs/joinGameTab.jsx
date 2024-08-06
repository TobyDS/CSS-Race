import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from '@mui/material';
import useGameStore from '@store/useGameStore';
import { useNavigate } from 'react-router-dom';

function JoinGameTab () {
  const navigate = useNavigate();
  const { roomId, setRoomId, resetState } = useGameStore();

  function handleButtonClick () {
    resetState();
    navigate('/room', { state: { tabValue: 'Join', roomId: roomId } });
  }

  return (
    <Card sx={{ minWidth: 550, height: '100%' }}>
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
            sx={{ width: '200px' }}
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button
            onClick={handleButtonClick}
            variant='contained'
            color='primary'
            sx={{ width: '200px', padding: '10px 0' }}
          >
            Join Room
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JoinGameTab;
