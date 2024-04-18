import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Battle from './pages/Battle';

function RedirectToBattle () {
  let navigate = useNavigate();
  React.useEffect(() => {
    navigate('/battle');
  }, [navigate]);

  return null;
}

function App () {
  return (
    <Router>
      <Routes>
        <Route path='/battle' element={<Battle />} />
        <Route path='*' element={<RedirectToBattle />} />
      </Routes>
    </Router>
  );
}

export default App;
