import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { initMonaco } from './utils/monacoLoader';
import Battle from '@pages/Room/Battle';
import Dashboard from '@pages/Dashboard';
import Room from '@pages/Room';

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
    <Router>
      <Routes>
        <Route path='/battle' element={<Battle />} />
        <Route path='/room' element={<Room />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<RedirectToDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
