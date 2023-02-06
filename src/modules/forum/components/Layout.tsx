import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Header } from './Header';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Box maxW={1200} margin="0 auto" py={12}>
      <Header />

      {children}
    </Box>
  );
};
