import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import * as Sentry from '@sentry/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallbackBasic from './components/ErrorBoundaryFallback/basic';

// Sentry.init({
//   dsn: import.meta.env.VITE_SENTRY_DSN,
//   integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.replayIntegration(),
//   ],
//   // Performance Monitoring
//   tracesSampleRate: 1.0, //  Capture 100% of the transactions
//   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
//   tracePropagationTargets: [
//     'localhost',
//     /^https:\/\/css-race-backend\.onrender\.com\/api/,
//   ],
//   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
//   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
// });

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackBasic}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
