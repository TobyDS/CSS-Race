import { ThemeProvider } from '@mui/material/styles';
import SocketContext from '@context/SocketContext';
import { PropTypes } from 'prop-types';

import darkTheme from '@data/darkTheme';

export default function Providers ({ children }) {
  return (
    <>
      <SocketContext>
        <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
      </SocketContext>
    </>
  );
}

Providers.propTypes = {
  children: PropTypes.node,
};
