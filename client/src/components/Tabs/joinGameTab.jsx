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

  function handleInputChange (e) {
    const inputValue = e.target.value;
    const roomIdFromUrl = extractRoomIdFromUrl(inputValue);
    setRoomId(roomIdFromUrl);
  }

  function extractRoomIdFromUrl (url) {
    const urlPattern = /\/room\/([a-zA-Z0-9_-]+)/;
    const match = url.match(urlPattern);
    return match ? match[1] : url;
  }

  function handleFormSubmit (e) {
    e.preventDefault();
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
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
            onSubmit={handleFormSubmit}
          >
            <TextField
              label='Room ID'
              variant='outlined'
              sx={{ width: '200px' }}
              value={roomId}
              onChange={handleInputChange}
            />
            <Button
              type='submit'
              variant='contained'
              color='primary'
              sx={{ width: '200px', padding: '10px 0' }}
            >
              Join Room
            </Button>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JoinGameTab;
