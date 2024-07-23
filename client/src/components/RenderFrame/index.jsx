import React, { useRef, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

import styles from './index.module.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function RenderFrame ({ combinedCode, bestScore, latestScore, isUser }) {
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const sanitizedCode = DOMPurify.sanitize(combinedCode);
    const blob = new Blob([sanitizedCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setIframeSrc(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [combinedCode]);

  return (
    <div className={styles.flexContainer}>
      <div className={styles.renderFrameContainer}>
        <div className={styles.flexRow}>
          <p>{isUser ? 'Your' : 'Opponents'} Code</p>
        </div>
        <div className={styles.iframeContainer}>
          <iframe
            ref={iframeRef}
            className={styles.frame}
            style={{
              background: 'white',
              width: '400px',
              height: '300px',
              border: '0px',
              outline: '0px',
              pointerEvents: 'none',
            }}
            src={iframeSrc}
            title='Render Frame'
          ></iframe>
        </div>
      </div>
      <p>Match {bestScore}%</p>
    </div>
  );
}

RenderFrame.propTypes = {
  combinedCode: PropTypes.string.isRequired,
  bestScore: PropTypes.number.isRequired,
  latestScore: PropTypes.number.isRequired,
  isUser: PropTypes.bool.isRequired,
};

export default RenderFrame;
