import loader from '@monaco-editor/loader';
import { emmetHTML, emmetCSS } from 'emmet-monaco-es';

// Configure the loader to use the locally installed Monaco Editor when in development
if (import.meta.env.MODE === 'development') {
  loader.config({ paths: { vs: '/node_modules/monaco-editor/min/vs' } });
}

export async function initMonaco (): Promise<Monaco> {
  const monacoInstance = await loader.init();
  emmetHTML(monacoInstance, ['html']);
  emmetCSS(monacoInstance, ['css']);
  return monacoInstance;
}
