import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  TextField,
  Button,
} from '@mui/material';

function JoinGameTab () {
  return (
    <Card sx={{ minWidth: 500, height: '100%' }}>
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
            sx={{ width: '300px', marginTop: '-10px' }}
          />
          <Button variant='contained' color='primary' sx={{ mt: 2 }}>
            Join Room
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default JoinGameTab;
