import { LoadingButton } from '@mui/lab';
import { Button, Paper } from '@mui/material/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AnnounceWinner from '@components/AnnounceWinner';
import CodeEditor from '@components/CodeEditor';
import Navbar from '@components/Navbar';
import RenderFrame from '@components/RenderFrame';
import RenderImage from '@components/RenderImage';
import styles from './index.module.css';
import useStore from '@store/useStore';
import useSocket from '@hooks/useSocket';

function Battle () {
  const {
    isHost,
    targetImage,
    combinedCode,
    opponentCode,
    localUserBestScore,
    opponentBestScore,
    codeIsSubmitting,
    gameOver,
    setCodeIsSubmitting,
    setHtmlCode,
    setCssCode,
    setGameOver,
  } = useStore();
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    if (!targetImage) {
      console.error('No target image found, redirecting to home');
      navigate('/');
    }
  }, [targetImage, navigate]);

  useEffect(() => {
    socket.emit('code_update', combinedCode);
  }, [combinedCode, socket]);

  function handleCheckCode () {
    setCodeIsSubmitting(true);
    socket.emit('code_submit', combinedCode);
  }

  return (
    <>
      <Navbar />
      <div className={styles.wrapper}>
        <AnnounceWinner
          announceWinner={gameOver}
          setAnnounceWinner={setGameOver}
          playerNumber={isHost ? 1 : 2}
          userBestScore={localUserBestScore}
          opponentBestScore={opponentBestScore}
        />
        <div className={styles.leftContainer}>
          <CodeEditor language={'html'} setValue={setHtmlCode} />
          <CodeEditor language={'css'} setValue={setCssCode} />
          <Paper className={styles.bottomBar} variant='elevation'>
            {codeIsSubmitting ? (
              <LoadingButton loading variant='contained'>
                Check Score
              </LoadingButton>
            ) : (
              <Button
                variant='contained'
                size='small'
                onClick={handleCheckCode}
              >
                Check Score
              </Button>
            )}
          </Paper>
        </div>
        <div className={styles.centerContainer}>
          <RenderFrame
            isLocalUser={true}
            combinedCode={combinedCode}
            bestScore={Math.round(localUserBestScore * 10) / 10}
          />
          <RenderFrame
            isLocalUser={false}
            combinedCode={opponentCode}
            bestScore={Math.round(opponentBestScore * 10) / 10}
          />
        </div>
        <div className={styles.rightContainer}>
          <RenderImage image={targetImage} />
        </div>
      </div>
    </>
  );
}

export default Battle;
