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

function RedirectToBattle () {
  let navigate = useNavigate();

  React.useEffect(() => {
    navigate('/battle');
  }, [navigate]);

  return null;
}
function App () {
  const [prevTab, setPrevTab] = React.useState('Create Room');

  return (
    <Router>
      <Routes>
        <Route path='/battle' element={<Battle />} />
        <Route path='/room' element={<Room />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<RedirectToBattle />} />
      </Routes>
    </Router>
  );
}

export default App;
