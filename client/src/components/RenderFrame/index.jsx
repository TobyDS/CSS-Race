import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.css';

function RenderFrame ({ combinedCode, bestScore, isLocalUser, image }) {
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState('');
  const [diffChecked, setDiffIsChecked] = useState(false);

  const handleDiffChange = () => {
    setDiffIsChecked(!diffChecked);
  };

  const handleHover = () => {
    console.log('hover');
  };

  const handleMouseOut = () => {
    console.log('out');
  };

  const handleMouseMove = (event) => {
    let bounds = event.target.getBoundingClientRect();
    let x = Math.floor(event.clientX - bounds.left);
    let y = Math.floor(event.clientY - bounds.top);
    console.log('x: ' + x, 'y: ' + y);
  };
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
          <label className={styles.checkBoxLabel}>
            <input
              type='checkbox'
              checked={diffChecked}
              onChange={handleDiffChange}
            />{' '}
            Diff
          </label>
        </div>
        <div
          className={styles.targetOverlayContainer}
          onMouseOver={handleHover}
          onMouseOut={handleMouseOut}
          onMouseMove={handleMouseMove}
        >
          <div
            className={styles.iframeContainer}
            style={{ mixBlendMode: diffChecked ? 'difference' : 'normal' }}
          >
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
          <img
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: 'clamp(0px, 400px, 100%)',
              pointerEvents: 'none',
            }}
            src={`data:image/jpeg;base64,${image.img}`}
            srcSet={`data:image/jpeg;base64,${image.img_2x} 2x`}
          />
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
  image: PropTypes.shape({
    img: PropTypes.string.isRequired,
    img_2x: PropTypes.string,
  }),
};

export default RenderFrame;
