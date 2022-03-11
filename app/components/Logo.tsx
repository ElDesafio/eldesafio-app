import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra, useColorModeValue, useToken } from '@chakra-ui/react';

export const Logo = (props: HTMLChakraProps<'svg'>) => {
  return (
    <chakra.svg
      color={useColorModeValue('blue.500', 'blue.300')}
      aria-hidden
      viewBox="0 0 301 338"
      height="138"
      // fill="none"
      // h="6"
      flexShrink={0}
      {...props}
    >
      <path
        d="M144.9 229.3L67.5 214.5V204.6L144.9 216.7V120L67.5 133.2V124.4L144.9 105.2V0.100006L0.399994 84.6V253.1L144.9 337.6V229.3Z"
        fill="#FFF"
      />
      <path
        d="M301 253.1L156.5 337.5V0.100006L301 84.6V253.1ZM233.9 123.6L224 121.1V216.7L233.1 214.5L233.9 123.6Z"
        fill="#FFF"
      />
    </chakra.svg>
    // <svg width="301" height="338" viewBox="0 0 301 338" fill="none" xmlns="http://www.w3.org/2000/svg">
    // <path d="M144.9 229.3L67.5 214.5V204.6L144.9 216.7V120L67.5 133.2V124.4L144.9 105.2V0.100006L0.399994 84.6V253.1L144.9 337.6V229.3Z" fill="#2B6CB0"/>
    // <path d="M301 253.1L156.5 337.5V0.100006L301 84.6V253.1ZM233.9 123.6L224 121.1V216.7L233.1 214.5L233.9 123.6Z" fill="#2B6CB0"/>
    // </svg>
  );
};
