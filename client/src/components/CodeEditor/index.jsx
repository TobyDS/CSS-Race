// src/components/CodeEditor.js
import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import editorDefaults from '/src/data/editorDefaults';

function CodeEditor ({ language, setValue }) {
  const editorRef = useRef();
  const [timeoutId, setTimeoutId] = useState();

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
