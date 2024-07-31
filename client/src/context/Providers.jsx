import { ThemeProvider } from '@mui/material/styles';
import { SocketProvider } from '@context/SocketContext';
import { PropTypes } from 'prop-types';

import darkTheme from '@data/darkTheme';

export default function Providers ({ children }) {
  return (
    <>
      <SocketProvider>
        <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
      </SocketProvider>
    </>
  );
}

Providers.propTypes = {
  children: PropTypes.node,
};
