import { useState } from 'react';
import CodeEditor from '/src/components/CodeEditor';

function Battle () {
  const [html, setHtml] = useState();

  return (
    <>
      <CodeEditor language={'html'} setValue={setHtml} />
    </>
  );
}

export default Battle;
