import { useState } from 'react';
import CodeEditor from './components/CodeEditor';

const templateCode = '<div></div>';

function App () {
  const [html, setHtml] = useState(templateCode);

  const editorConfig = {
    editorHeight: '90vh',
    language: 'html',
    templateCode: templateCode,
  };

  return (
    <>
      <h1>CSS Race</h1>
      <CodeEditor editorConfig={editorConfig} setValue={setHtml} />
    </>
  );
}

export default App;
