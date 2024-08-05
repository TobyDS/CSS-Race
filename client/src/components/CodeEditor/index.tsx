import Editor, { OnChange } from '@monaco-editor/react';
import { useRef, useState } from 'react';

import editorDefaults from '@data/editorDefaults';
import styles from './index.module.css';

interface CodeEditorProps {
  language: 'html' | 'css';
  setValue: (value: string) => void;
}

function CodeEditor ({ language, setValue }: CodeEditorProps) {
  const editorRef = useRef<Editor>();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | undefined>();

  function handleOnMount (editor: Editor) {
    editorRef.current = editor;
  }

  const handleChange: OnChange = (newValue: string | undefined) => {
    clearTimeout(timeoutId);
    if (newValue !== undefined) {
      setTimeoutId(setTimeout(() => setValue(newValue), 1000)); // 1000ms delay
    }
  };

  const editorTemplate: string =
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

export default CodeEditor;
