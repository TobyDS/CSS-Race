import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

import styles from './index.module.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function RenderFrame ({ combinedCode }) {
  const sanitizedCode = DOMPurify.sanitize(combinedCode);
  return (
    <div className={styles.flexContainer}>
      <div className={styles.renderFrameContainer}>
        <div className={styles.flexRow}>
          <p>Your Code</p>
        </div>
        <iframe
          className={styles.frame}
          srcDoc={sanitizedCode}
          title='Render Frame'
          width='400'
          height='300'
        ></iframe>
      </div>
      <p>Match 0%</p>
    </div>
  );
}

RenderFrame.propTypes = {
  combinedCode: PropTypes.string.isRequired,
};

export default RenderFrame;
