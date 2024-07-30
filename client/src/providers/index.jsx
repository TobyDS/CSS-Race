import { ThemeProvider } from '@mui/material/styles';
import { PropTypes } from 'prop-types';

import darkTheme from '@data/darkTheme';

export default function Providers ({ children }) {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
}

Providers.propTypes = {
  children: PropTypes.node,
};
