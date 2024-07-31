import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useStore from '@store/useStore';

import { userStatusUtils } from '@utils/userStatusUtils';
import styles from './index.module.css';

function UserStatus ({ isLocalUser }) {
  const { isHost, localUserReady, setLocalUserReady, opponentReady } =
    useStore();
  const targetUserReady = isLocalUser ? localUserReady : opponentReady;
  const playerNum = !(isHost ^ isLocalUser) ? 1 : 2;
  const userSvg = userStatusUtils.getSVG({ playerNum, targetUserReady });
  const userStatusText = userStatusUtils.getUserStatusText(targetUserReady);

  return (
    <div className={styles.flexCol}>
      <Typography>
        Player {playerNum}: {userStatusText}
      </Typography>
      {userSvg}
      {isLocalUser && (
        <Button
          className={styles.button}
          onClick={() => setLocalUserReady(!localUserReady)}
          variant={localUserReady ? 'contained' : 'outlined'}
          color={isHost ? 'primary' : 'error'}
        >
          {localUserReady ? 'Cancel' : 'Ready Up'}
        </Button>
      )}
    </div>
  );
}

UserStatus.propTypes = {
  isLocalUser: PropTypes.bool.isRequired,
};

export default UserStatus;
