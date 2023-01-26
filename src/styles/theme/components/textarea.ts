import { mode } from '@chakra-ui/theme-tools';

const textareaStyle = {
  variants: {
    outline: (props) => ({
      bg: mode('blackAlpha.50', 'whiteAlpha.50')(props),
    }),
  },
  defaultProps: {
    variant: 'outline',
  },
};

export default textareaStyle;
