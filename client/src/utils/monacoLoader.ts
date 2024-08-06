import { loader } from '@monaco-editor/react';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';

// Configure the loader to use the locally installed Monaco Editor when in development
if (import.meta.env.MODE === 'development') {
  loader.config({ paths: { vs: '/node_modules/monaco-editor/min/vs' } });
}

export async function initMonaco () {
  const monacoInstance = await loader.init();
  emmetHTML(monacoInstance, ['html']);
  emmetCSS(monacoInstance, ['css']);
  return monacoInstance;
}
