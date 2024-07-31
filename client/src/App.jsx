// App.jsx
import { useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from 'react-router-dom';

import Dashboard from '@pages/Dashboard';
import Room from '@pages/Room';
import Battle from '@pages/Battle';
import Providers from '@context/Providers';
import { initMonaco } from '@utils/monacoLoader';

function App () {
  useEffect(() => {
    initMonaco();
  }, []);

  return (
    <Providers>
      <Router>
        <Routes>
          <Route path='/battle' element={<Battle />} />
          <Route path='/room' element={<Room />} />
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
