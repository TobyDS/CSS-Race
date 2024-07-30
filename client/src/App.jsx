import { useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from 'react-router-dom';

import Dashboard from '@pages/Dashboard';
import Room from '@pages/Room';
import Battle from '@pages/Room/Battle';
import Providers from '@providers';
import { initMonaco } from '@utils/monacoLoader';

function RedirectToDashboard () {
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return null;
}

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
          <Route path='*' element={<RedirectToDashboard />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
