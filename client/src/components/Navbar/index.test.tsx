import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// To Test
import Navbar from './index';

// Tests
describe('Renders main page correctly', () => {
  it('Should render the page correctly', () => {
    // Setup
    render(
      <Router>
        <Navbar />
      </Router>
    );

    // Expectations
    expect(screen.getByTestId('nav-logo')).toBeInTheDocument();
  });
});
