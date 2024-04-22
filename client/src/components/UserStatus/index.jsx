import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { userStatusUtils } from '@utils/userStatusUtils';

import styles from './index.module.css';

function UserStatus ({ playerNum, isHost, isReady, setIsReady }) {
  const userSvg = userStatusUtils.getSVG({ playerNum, isReady });
  const userStatusText = userStatusUtils.getUserStatusText(isReady);

  return (
    <div className={styles.flexCol}>
      <Typography>
        Player {playerNum}: {userStatusText}
      </Typography>
      {userSvg}
      {((isHost && playerNum === 1) || (!isHost && playerNum === 2)) && (
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
  playerNum: PropTypes.number.isRequired,
  isHost: PropTypes.bool.isRequired,
  isReady: PropTypes.bool,
  setIsReady: PropTypes.func,
};

export default UserStatus;
