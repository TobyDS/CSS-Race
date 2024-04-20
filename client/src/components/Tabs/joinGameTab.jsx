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
