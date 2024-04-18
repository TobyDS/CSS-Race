import { useState, useEffect } from 'react';
import CodeEditor from '/src/components/CodeEditor';
import editorDefaults from '/src/data/editorDefaults';

function Battle () {
  const [htmlCode, setHtmlCode] = useState(editorDefaults.htmlTemplate);
  const [cssCode, setCssCode] = useState(editorDefaults.cssTemplate);
  const [combinedCode, setCombinedCode] = useState();

  useEffect(() => {
    setCombinedCode(
      `<html><body>${htmlCode}<style>${cssCode}</style></body></html>`
    );
  }, [htmlCode, cssCode]);

  return (
    <>
      <CodeEditor language={'html'} setValue={setHtmlCode} />
      <CodeEditor language={'css'} setValue={setCssCode} />
    </>
  );
}

export default Battle;
