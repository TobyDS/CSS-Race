import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import { emmetHTML } from 'emmet-monaco-es';
import { useRef, useState } from 'react';
import styles from './index.module.css';

import editorDefaults from '../../data/editorDefaults';

function CodeEditor ({ language, setValue }) {
  const disposeEmmetRef = useRef();
  const editorRef = useRef();
  const [timeoutId, setTimeoutId] = useState();

  function handleEditorWillMount (monaco) {
    disposeEmmetRef.current = emmetHTML(monaco);
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
      <Editor
        theme='vs-dark'
        height={editorDefaults.height}
        width={'50%'}
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
