import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Navbar () {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='a'
          href='#app-bar-with-responsive-menu'
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          CSS Race
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
