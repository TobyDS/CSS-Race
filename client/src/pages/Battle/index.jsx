import { useState, useEffect } from 'react';
import CodeEditor from '/src/components/CodeEditor';
import editorDefaults from '/src/data/editorDefaults';
import RenderFrame from '/src/components/RenderFrame';
import styles from './index.module.css';

function Battle () {
  const [htmlCode, setHtmlCode] = useState(editorDefaults.htmlTemplate);
  const [cssCode, setCssCode] = useState(editorDefaults.cssTemplate);
  const [combinedCode, setCombinedCode] = useState('');

  useEffect(() => {
    setCombinedCode(
      `<html><body>${htmlCode}<style>${cssCode}</style></body></html>`
    );
  }, [htmlCode, cssCode]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <CodeEditor language={'html'} setValue={setHtmlCode} />
        <CodeEditor language={'css'} setValue={setCssCode} />
      </div>
      <div className={styles.rightContainer}>
        <RenderFrame combinedCode={combinedCode} />
      </div>
    </div>
  );
}

export default Battle;
