import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useStore from '@store/useStore';
import { userStatusUtils } from '@utils/userStatusUtils';
import styles from './index.module.css';

interface UserStatusProps {
  isLocalUser: boolean;
}

function UserStatus ({ isLocalUser }: UserStatusProps) {
  const { isHost, localUserReady, setLocalUserReady, opponentReady } =
    useStore();
  const targetUserReady = isLocalUser ? localUserReady : opponentReady;
  const playerNum = !(isHost !== isLocalUser) ? 1 : 2;
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
export default UserStatus;
