import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import { emmetCSS, emmetHTML } from 'emmet-monaco-es';
import { useRef, useState } from 'react';
import styles from './index.module.css';
import { Typography } from '@mui/material';

import editorDefaults from '/src/data/editorDefaults';

function CodeEditor ({ language, setValue }) {
  const disposeEmmetRef = useRef();
  const editorRef = useRef();
  const [timeoutId, setTimeoutId] = useState();

  function handleEditorWillMount (monaco) {
    if (language === 'html') {
      disposeEmmetRef.current = emmetHTML(monaco);
    } else {
      disposeEmmetRef.current = emmetCSS(monaco);
    }
  }

  function handleOnMount (editor) {
    editorRef.current = editor;
  }

  function handleChange (newValue) {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setValue(newValue), 1000)); // 1000ms delay
  }

  const editorTemplate =
    language === 'html'
      ? editorDefaults.htmlTemplate
      : editorDefaults.cssTemplate;

  return (
    <div className={styles.editorContainer + ' editor-container'}>
      <p className={styles.tabLabel}>{language.toUpperCase()}</p>
      <Editor
        theme='vs-dark'
        height={editorDefaults.height}
        defaultLanguage={language}
        defaultValue={editorTemplate}
        beforeMount={handleEditorWillMount}
        onChange={handleChange}
        onMount={handleOnMount}
        options={editorDefaults.options}
      />
    </div>
  );
}

CodeEditor.propTypes = {
  language: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default CodeEditor;
