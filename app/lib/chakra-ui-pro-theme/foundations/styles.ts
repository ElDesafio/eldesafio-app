import type { StyleFunctionProps } from '@chakra-ui/theme-tools';
import { lighten, mode } from '@chakra-ui/theme-tools';

export default {
  global: (props: StyleFunctionProps) => ({
    body: {
      color: 'default',
      bg: 'bg-canvas',
    },
    '*::placeholder': {
      opacity: 1,
      color: 'subtle',
    },
    '*, *::before, &::after': {
      borderColor: mode('gray.200', lighten('gray.700', 3)(props.theme))(props),
    },
  }),
};
