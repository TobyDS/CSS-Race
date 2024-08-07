import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import styles from './index.module.css';

function RenderFrame ({ combinedCode, bestScore, isLocalUser, image }) {
  const iframeRef = useRef(null);
  const [iframeSrc, setIframeSrc] = useState('');
  const [diffChecked, setDiffIsChecked] = useState(false);
  const [showSlider, setShowSlider] = useState(false);
  const [horizontal, setHorizontal] = useState(false);
  const [cursorXPosition, setCursorXPosition] = useState(400);
  const [cursorYPosition, setCursorYPosition] = useState(300);

  const handleDiffChange = () => {
    setDiffIsChecked(!diffChecked);
  };

  const handleHover = () => {
    setShowSlider(true);
  };

  const handleMouseOut = () => {
    setShowSlider(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Shift') {
      setHorizontal(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Shift') {
      setHorizontal(false);
    }
  };

  const handleMouseMove = (event) => {
    let bounds = event.target.getBoundingClientRect();
    setCursorXPosition(event.clientX - bounds.left);
    setCursorYPosition(event.clientY - bounds.top);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

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
          style={{ cursor: horizontal ? 'row-resize' : 'col-resize' }}
        >
          <div
            className={styles.iframeContainer}
            style={{
              width: showSlider && !horizontal ? cursorXPosition : 400,
              height: showSlider && horizontal ? cursorYPosition : 300,
              mixBlendMode: diffChecked ? 'difference' : 'normal',
              opacity: showSlider ? '0.9' : '1',
              transition: showSlider ? 'all' : '0.3s',
              boxShadow: showSlider
                ? horizontal
                  ? '0 2px 0 rgb(255, 34, 34)'
                  : '2px 0 0 rgb(255, 34, 34)'
                : 'none',
            }}
          >
            <iframe
              ref={iframeRef}
              className={styles.iframe}
              src={iframeSrc}
              title='Render Frame'
            ></iframe>
          </div>
          <div
            className={styles.overlaySlider}
            style={{
              opacity: showSlider ? '1' : '0',
              top:
                showSlider && horizontal ? cursorYPosition + 'px' : 300 + 'px',
              left:
                showSlider && !horizontal ? cursorXPosition + 'px' : 400 + 'px',
              transform: horizontal
                ? 'translate(-60%, -50%)'
                : 'translate(-50%, 0px)',
            }}
          >
            {showSlider
              ? horizontal
                ? Math.floor(cursorYPosition)
                : Math.floor(cursorXPosition)
              : 400}
          </div>
          <img
            className={styles.targetOverlay}
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
