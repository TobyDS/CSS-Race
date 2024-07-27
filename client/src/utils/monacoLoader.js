// src/utils/monacoLoader.js
import loader from '@monaco-editor/loader';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';

// Configure the loader to use the locally installed Monaco Editor
loader.config({ paths: { vs: '/node_modules/monaco-editor/min/vs' } });

export function initMonaco () {
  return loader.init().then((monacoInstance) => {
    // Initialize Emmet
    emmetHTML(monacoInstance, ['html']);
    emmetCSS(monacoInstance, ['css']);
    return monacoInstance;
  });
}
