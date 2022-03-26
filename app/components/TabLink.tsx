import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra, useColorModeValue as mode } from '@chakra-ui/react';

import { LinkED } from './LinkED';

export const TabLink = (props: HTMLChakraProps<'a'> & { to?: string }) => (
  <chakra.a
    fontWeight="semibold"
    px="4"
    py="3"
    color={mode('gray.600', 'gray.400')}
    borderBottom="2px solid transparent"
    transition="all 0.2s"
    _hover={{
      borderColor: mode('gray.400', 'gray.600'),
    }}
    _activeLink={{
      color: mode('blue.600', 'blue.400'),
      borderColor: 'currentColor',
    }}
    as={props.to ? LinkED : undefined}
    {...props}
    to={props.to}
  />
);
