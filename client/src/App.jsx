import CodeEditor from './components/CodeEditor';

function App () {
  const editorHeight = '90vh';
  const language = 'html';
  const templateCode = '<div></div>';
  return (
    <>
      <h1>CSS Race</h1>
      <CodeEditor
        editorHeight={editorHeight}
        language={language}
        templateCode={templateCode}
      />
    </>
  );
}

export default App;
