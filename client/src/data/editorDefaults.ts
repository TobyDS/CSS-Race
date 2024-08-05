import { EditorProps } from '@monaco-editor/react';

interface EditorDefaults {
  height: EditorProps['height'];
  options: EditorProps['options'];
  htmlTemplate: string;
  cssTemplate: string;
}

const editorDefaults: EditorDefaults = {
  height: 'calc((100vh - 70px - 100px - 50px )/ 2)',
  options: {
    minimap: { enabled: false },
    lineNumbers: 'off',
    linkedEditing: true,
    fontSize: 14,
  },
  htmlTemplate: '<div></div>',
  cssTemplate:
    'div {\n  width: 100px;\n  height: 100px;\n  background: #dd6b4d;\n}',
};

export default editorDefaults;
