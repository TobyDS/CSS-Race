import { useState } from 'react';
import CodeEditor from '/src/components/CodeEditor';

function Battle () {
  const [html, setHtml] = useState();
  const [css, setCss] = useState();

  return (
    <>
      <CodeEditor language={'html'} setValue={setHtml} />
      <CodeEditor language={'css'} setValue={setCss} />
    </>
  );
}

export default Battle;
