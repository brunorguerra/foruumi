import { mode, GlobalStyleProps } from '@chakra-ui/theme-tools';

export const styles = {
  global: (props: GlobalStyleProps) => ({
    html: {
      bg: mode('whiteAlpha.600', 'gray.800')(props),
      minH: '100vh',
    },
    body: {
      bg: mode('whiteAlpha.600', 'gray.800')(props),
      h: '100%',
      WebkitTapHighlightColor: 'transparent',
    },
    '#chakra-toast-portal > *': {
      pt: 'safe-top',
      pl: 'safe-left',
      pr: 'safe-right',
      pb: 'safe-bottom',
    },
  }),
};
