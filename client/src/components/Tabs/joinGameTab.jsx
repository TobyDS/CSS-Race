import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function JoinGameTab () {
  const navigate = useNavigate();

  function handleButtonClick () {
    navigate('/room', { state: { tabValue: 'Join' } });
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
            sx={{ width: '200px', marginTop: '-20px' }}
          />
          <Button
            onClick={handleButtonClick}
            variant='contained'
            color='primary'
            mt={0}
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
