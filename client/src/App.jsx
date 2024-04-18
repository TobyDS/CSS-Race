import { useState } from 'react';
import CodeEditor from './components/CodeEditor';

function App () {
  const [html, setHtml] = useState();

  return (
    <>
      <h1>CSS Race</h1>
      <CodeEditor language={'html'} setValue={setHtml} />
    </>
  );
}

export default App;
