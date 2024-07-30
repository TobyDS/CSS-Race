import loader from '@monaco-editor/loader';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';

// Configure the loader to use the locally installed Monaco Editor when in development
if (import.meta.env.MODE === 'development') {
  loader.config({ paths: { vs: '/node_modules/monaco-editor/min/vs' } });
}

export function initMonaco () {
  return loader.init().then((monacoInstance) => {
    emmetHTML(monacoInstance, ['html']);
    emmetCSS(monacoInstance, ['css']);
    return monacoInstance;
  });
}
