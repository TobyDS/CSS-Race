import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { userStatusUtils } from '@utils/userStatusUtils';

import styles from './index.module.css';

function UserStatus ({ isHost, isUser, isReady, setIsReady }) {
  const userSvg = userStatusUtils.getSVG({ isHost, isReady });
  const userStatusText = userStatusUtils.getUserStatusText(isReady);

  return (
    <div className={styles.flexCol}>
      <Typography>
        Player {isHost ? 1 : 2}: {userStatusText}
      </Typography>
      {userSvg}
      {isUser && (
        <Button
          className={styles.button}
          onClick={() => setIsReady(!isReady)}
          variant={isReady ? 'contained' : 'outlined'}
          color={isHost ? 'primary' : 'error'}
        >
          {isReady ? 'Cancel' : 'Ready Up'}
        </Button>
      )}
    </div>
  );
}

UserStatus.propTypes = {
  isHost: PropTypes.bool.isRequired,
  isUser: PropTypes.bool.isRequired,
  isReady: PropTypes.bool,
  setIsReady: PropTypes.func,
};

export default UserStatus;
