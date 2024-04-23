import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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

function Battle () {
  const [htmlCode, setHtmlCode] = useState(editorDefaults.htmlTemplate);
  const [cssCode, setCssCode] = useState(editorDefaults.cssTemplate);
  const [combinedCode, setCombinedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const image = location.state?.image || '';
  const [userBestScore, setUserBestScore] = useState(0);
  const [userLatestScore, setUserLatestScore] = useState(0);
  const [opponentBestScore, setOpponentBestScore] = useState(0);
  const [opponentLatestScore, setOpponentLatestScore] = useState(0);

  useEffect(() => {
    socketFunctions.setSetLoadingFunction(setLoading);
    socketFunctions.setSetUserBestScoreFunction(setUserBestScore);
    socketFunctions.setSetUserLatestScoreFunction(setUserLatestScore);
    socketFunctions.setSetOpponentBestScoreFunction(setOpponentBestScore);
    socketFunctions.setSetOpponentLatestScoreFunction(setOpponentLatestScore);
  }, []);

  useEffect(() => {
    setCombinedCode(
      `<html><body>${htmlCode}<style>${cssCode}</style></body></html>`
    );
  }, [htmlCode, cssCode]);

  function handleCheckCode () {
    setLoading(true);
    socketFunctions.emitCheckCode(combinedCode);
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Navbar />

      <div className={styles.wrapper}>
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
            combinedCode={combinedCode}
            bestScore={userBestScore}
            latestScore={userLatestScore}
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
