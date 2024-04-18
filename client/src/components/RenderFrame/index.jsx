import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function RenderFrame ({ combinedCode }) {
  const sanitizedCode = DOMPurify.sanitize(combinedCode);
  return (
    <iframe
      className={styles.frame}
      srcDoc={sanitizedCode}
      title='Render Frame'
      width='400'
      height='300'
    ></iframe>
  );
}

RenderFrame.propTypes = {
  combinedCode: PropTypes.string.isRequired,
};

export default RenderFrame;
