import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import { emmetHTML } from 'emmet-monaco-es';
import { useRef, useState } from 'react';
import styles from './index.module.css';

function CodeEditor ({ editorConfig, setValue }) {
  const disposeEmmetHTMLRef = useRef();
  const editorRef = useRef();
  const [timeoutId, setTimeoutId] = useState();

  function handleEditorWillMount (monaco) {
    disposeEmmetHTMLRef.current = emmetHTML(monaco);
  }

  function handleOnMount (editor) {
    editorRef.current = editor;
  }

  function handleChange (newValue) {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setValue(newValue), 1000)); // 1000ms delay
  }

  const { editorHeight, language, templateCode } = editorConfig;
  return (
    <div className='editor-container'>
      <Editor
        height={editorHeight}
        defaultLanguage={language}
        defaultValue={templateCode}
        theme='vs-dark'
        beforeMount={handleEditorWillMount}
        onChange={handleChange}
        onMount={handleOnMount}
      />
    </div>
  );
}

CodeEditor.propTypes = {
  editorConfig: PropTypes.shape({
    editorHeight: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    templateCode: PropTypes.string.isRequired,
  }).isRequired,
  setValue: PropTypes.func.isRequired,
};

export default CodeEditor;
