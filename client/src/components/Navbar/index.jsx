import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

function Navbar () {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/' className={styles.Logo}>
          <img
            alt='Logo'
            src='/src/assets/images/CSS Logo Dark Mode.svg'
            height='30px'
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
