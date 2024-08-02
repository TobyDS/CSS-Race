import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.css';

function RenderFrame ({ combinedCode, bestScore, isLocalUser }) {
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState('');

  useEffect(() => {
    const sanitizedCode = DOMPurify.sanitize(combinedCode);
    // Create the full HTML string including the script tag in the head
    const fullHtml = `<html><head><style>html{height:100%;width:100%}body{overflow:clip}</style></head><body>${sanitizedCode}</body></html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
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
          <p>{isLocalUser ? 'Your' : 'Opponents'} Code</p>
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
  isLocalUser: PropTypes.bool.isRequired,
};

export default RenderFrame;
