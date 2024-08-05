import monaco from 'monaco-editor/esm/vs/editor/editor.api';

declare global {
  type Monaco = typeof monaco;
  type Editor = monaco.editor.IStandaloneCodeEditor;
}

export {};
