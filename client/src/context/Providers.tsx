import { ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { SocketProvider } from '@context/SocketContext';

import darkTheme from '@data/darkTheme';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers ({ children }: ProvidersProps) {
  return (
    <>
      <SocketProvider>
        <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
      </SocketProvider>
    </>
  );
}
