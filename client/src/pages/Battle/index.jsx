import { useState, useEffect } from 'react';
import CodeEditor from '/src/components/CodeEditor';
import editorDefaults from '/src/data/editorDefaults';
import RenderFrame from '/src/components/RenderFrame';
import apiClientService from '/src/services/apiClientService';
import RenderImage from '/src/components/RenderImage';

import styles from './index.module.css';

function Battle () {
  const [htmlCode, setHtmlCode] = useState(editorDefaults.htmlTemplate);
  const [cssCode, setCssCode] = useState(editorDefaults.cssTemplate);
  const [combinedCode, setCombinedCode] = useState('');
  const [image, setImage] = useState();

  useEffect(() => {
    apiClientService.getRandomImage().then((response) => {
      setImage(response);
    });
  }, []);

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
        <RenderImage image={image} />
      </div>
    </div>
  );
}

export default Battle;
