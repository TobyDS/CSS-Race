import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Battle from '@pages/Room/Battle';
import Dashboard from '@pages/Dashboard';
import Room from '@pages/Room'; // Import the 'Room' component

function RedirectToDashboard () {
  let navigate = useNavigate();

  React.useEffect(() => {
    navigate('/D');
  }, [navigate]);

  return null;
}
function App () {
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
