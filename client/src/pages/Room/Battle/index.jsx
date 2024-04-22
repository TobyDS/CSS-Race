import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { Grid } from '@mui/material';

import CodeEditor from '@components/CodeEditor';
import editorDefaults from '@data/editorDefaults';
import RenderFrame from '@components/RenderFrame';
import RenderImage from '@components/RenderImage';
import Navbar from '@components/Navbar';
import darkTheme from '@data/darkTheme';
import styles from './index.module.css';

function Battle () {
  const [htmlCode, setHtmlCode] = useState(editorDefaults.htmlTemplate);
  const [cssCode, setCssCode] = useState(editorDefaults.cssTemplate);
  const [combinedCode, setCombinedCode] = useState('');
  const location = useLocation();
  const image = location.state?.image || '';

  useEffect(() => {
    setCombinedCode(
      `<html><body>${htmlCode}<style>${cssCode}</style></body></html>`
    );
  }, [htmlCode, cssCode]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Grid container alignItems='flex-start' minHeight='100vh'>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
        <Grid
          container
          item
          height='100%'
          direction='column'
          alignItems='center'
          justifyContent='center'
        >
          <div className={styles.wrapper}>
            <div className={styles.leftContainer}>
              <CodeEditor language={'html'} setValue={setHtmlCode} />
              <CodeEditor language={'css'} setValue={setCssCode} />
            </div>
            <div className={styles.centerContainer}>
              <RenderFrame combinedCode={combinedCode} />
            </div>
            <div className={styles.rightContainer}>
              <RenderImage image={image} />
            </div>
          </div>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Battle;
