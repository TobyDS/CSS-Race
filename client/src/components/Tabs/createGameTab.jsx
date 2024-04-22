import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';

function CreateGameTab () {
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
            Create a new game
          </Typography>
          <Button
            component={RouterLink}
            to={{
              pathname: '/room',
              state: { referrer: 'Create' },
            }}
            variant='contained'
            color='primary'
            sx={{ width: '200px', padding: '10px' }}
          >
            Create Room
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CreateGameTab;
