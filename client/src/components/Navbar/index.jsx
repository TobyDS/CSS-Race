import { AppBar, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';

import logoImg from '@images/CSS Logo Dark Mode.svg';
import styles from './index.module.css';

function Navbar () {
  return (
    <AppBar position='static' className={styles.Navbar}>
      <Toolbar>
        <Link to='/' className={styles.Logo}>
          <img data-testid='nav-logo' alt='Logo' src={logoImg} height='30px' />
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
