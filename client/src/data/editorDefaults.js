const editorDefaults = {
  height: 'calc((100vh - 70px - 100px - 50px )/ 2)',
  options: {
    minimap: { enabled: false },
    lineNumbers: false,
    linkedEditing: true,
    fontSize: 14,
  },
  htmlTemplate: '<div></div>',
  cssTemplate:
    'div {\n  width: 100px;\n  height: 100px;\n  background: #dd6b4d;\n}',
};

export default editorDefaults;
