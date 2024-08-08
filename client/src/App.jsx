import { useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorBoundaryFallback from '@components/ErrorBoundaryFallback';
import Dashboard from '@pages/Dashboard';
import Room from '@pages/Room';
import Battle from '@pages/Battle';
import Providers from '@context/Providers';
import { initMonaco } from '@utils/monacoLoader';

function App () {
  useEffect(() => {
    initMonaco();
  }, []);

  const logError = (error, info) => {
    if (error.message !== 'Simulated error coming from DevTools') {
      console.error(error, info);
    }
  };

  return (
    <Providers>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onError={logError}
      >
        <Router>
          <Routes>
            <Route path='/battle' element={<Battle />} />
            <Route path='/room' element={<Room />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
