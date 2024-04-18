import Editor from '@monaco-editor/react';
import PropTypes from 'prop-types';
import styles from './index.module.css';

function CodeEditor ({ editorHeight, language, templateCode }) {
  return (
    <div className='editor-container'>
      <Editor
        height={editorHeight}
        defaultLanguage={language}
        defaultValue={templateCode}
        theme='vs-dark'
      />
    </div>
  );
}

CodeEditor.propTypes = {
  editorHeight: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  templateCode: PropTypes.string.isRequired,
};

export default CodeEditor;
