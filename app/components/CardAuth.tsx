import type { BoxProps } from '@chakra-ui/react';
import { Box, useColorModeValue } from '@chakra-ui/react';

export const CardAuth = (props: BoxProps) => (
  <Box
    bg={useColorModeValue('white', 'gray.700')}
    py="8"
    px={{ base: '4', md: '10' }}
    shadow="base"
    rounded={{ sm: 'lg' }}
    {...props}
  />
);
