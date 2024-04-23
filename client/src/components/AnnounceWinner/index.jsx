import { useState, useEffect } from 'react';
import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CardActions,
  Divider,
  Typography,
} from '@mui/material';
import propTypes from 'prop-types';

import styles from './index.module.css';

function AnnounceWinner ({
  announceWinner,
  setAnnounceWinner,
  playerNumber,
  userBestScore,
  opponentBestScore,
}) {
  const [winner, setWinner] = useState(null);
  const [roundedUserScore, setRoundedUserScore] = useState(0);
  const [roundedOpponentScore, setRoundedOpponentScore] = useState(0);

  useEffect(() => {
    if (
      typeof userBestScore === 'number' &&
      typeof opponentBestScore === 'number'
    ) {
      const opponentNumber = playerNumber === 1 ? 2 : 1;
      setRoundedUserScore(Math.round(userBestScore * 10) / 10);
      setRoundedOpponentScore(Math.round(opponentBestScore * 10) / 10);
      setWinner(
        userBestScore >= opponentBestScore ? playerNumber : opponentNumber
      );
    }
  }, [announceWinner, playerNumber, userBestScore, opponentBestScore]);

  function handleClose () {
    setAnnounceWinner(false);
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={announceWinner}
      onClick={handleClose}
    >
      <Card>
        <CardContent>
          <div className={styles.flexRow}>
            <Typography variant='h6'>Winner: Player {winner}</Typography>
          </div>
          <div className={styles.playMatches}>
            <div className={styles.center}>
              <Typography variant='h6'>Player 1 Achieved</Typography>
              <Typography variant='h6'>
                {playerNumber === 1 ? roundedUserScore : roundedOpponentScore}%
                Match
              </Typography>
            </div>
            <Divider orientation='vertical' flexItem />
            <div className={styles.center}>
              <Typography variant='h6'>Player 2 Achieved</Typography>
              <Typography variant='h6'>
                {playerNumber !== 1 ? roundedUserScore : roundedOpponentScore}%
                Match
              </Typography>
            </div>
          </div>
        </CardContent>
        <CardActions
          sx={{ mb: 3, justifyContent: 'space-evenly', gap: '2rem' }}
        >
          <Button variant='outlined'>Dismiss</Button>
          <Button variant='contained'>New Game</Button>
        </CardActions>
      </Card>
    </Backdrop>
  );
}

AnnounceWinner.propTypes = {
  announceWinner: propTypes.bool.isRequired,
  setAnnounceWinner: propTypes.func.isRequired,
  playerNumber: propTypes.number.isRequired,
  userBestScore: propTypes.number.isRequired,
  opponentBestScore: propTypes.number,
};

export default AnnounceWinner;
