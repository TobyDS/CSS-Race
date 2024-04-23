import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { Paper, Button } from '@mui/material/';
import { LoadingButton } from '@mui/lab';

import socketFunctions from '@utils/useSocket';
import CodeEditor from '@components/CodeEditor';
import RenderFrame from '@components/RenderFrame';
import RenderImage from '@components/RenderImage';
import Navbar from '@components/Navbar';
import editorDefaults from '@data/editorDefaults';
import darkTheme from '@data/darkTheme';
import styles from './index.module.css';
import AnnounceWinner from '@components/AnnounceWinner';

function Battle () {
  const [htmlCode, setHtmlCode] = useState(editorDefaults.htmlTemplate);
  const [cssCode, setCssCode] = useState(editorDefaults.cssTemplate);
  const [loading, setLoading] = useState(false);
  const [combinedCode, setCombinedCode] = useState('');
  const [userBestScore, setUserBestScore] = useState(0);
  const [userLatestScore, setUserLatestScore] = useState(0);
  const [opponentCode, setOpponentCode] = useState('');
  const [opponentBestScore, setOpponentBestScore] = useState(0);
  const [opponentLatestScore, setOpponentLatestScore] = useState(0);
  const [announceWinner, setAnnounceWinner] = useState(false);
  const location = useLocation();

  const image = location.state?.image || '';
  const playerNumber = location.state?.playerNumber;

  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state?.image) {
      navigate('/');
    }
  }, [location.state?.image, navigate]);

  useEffect(() => {
    socketFunctions.setSetLoadingFunction(setLoading);
    socketFunctions.setSetOpponentCodeFunction(setOpponentCode);
    socketFunctions.setSetUserBestScoreFunction(setUserBestScore);
    socketFunctions.setSetUserLatestScoreFunction(setUserLatestScore);
    socketFunctions.setSetOpponentBestScoreFunction(setOpponentBestScore);
    socketFunctions.setSetOpponentLatestScoreFunction(setOpponentLatestScore);
    socketFunctions.setSetAnnounceWinnerFunction(setAnnounceWinner);
  }, []);

  useEffect(() => {
    const newCombinedCode = `<html><body>${htmlCode}<style>${cssCode}</style></body></html>`;
    setCombinedCode(newCombinedCode);
    socketFunctions.emitCodeUpdate(newCombinedCode);
  }, [htmlCode, cssCode]);

  function handleCheckCode () {
    setLoading(true);
    socketFunctions.emitCheckCode(combinedCode);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />

      <div className={styles.wrapper}>
        <AnnounceWinner
          announceWinner={announceWinner}
          setAnnounceWinner={setAnnounceWinner}
          playerNumber={playerNumber}
          userBestScore={userBestScore}
          opponentBestScore={opponentBestScore}
        />
        <div className={styles.leftContainer}>
          <CodeEditor language={'html'} setValue={setHtmlCode} />
          <CodeEditor language={'css'} setValue={setCssCode} />
          <Paper className={styles.bottomBar} variant='elevation'>
            {loading ? (
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
            isUser={true}
            combinedCode={combinedCode}
            bestScore={Math.round(userBestScore * 10) / 10}
            latestScore={Math.round(userLatestScore * 10) / 10}
          />
          <RenderFrame
            isUser={false}
            combinedCode={opponentCode}
            bestScore={Math.round(opponentBestScore * 10) / 10}
            latestScore={Math.round(opponentLatestScore * 10) / 10}
          />
        </div>
        <div className={styles.rightContainer}>
          <RenderImage image={image} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Battle;
