import type { StackProps } from '@chakra-ui/react';
import { Box, Heading, Stack } from '@chakra-ui/react';

interface FieldGroupProps extends StackProps {
  title?: string;
}

export const FieldGroup = (props: FieldGroupProps) => {
  const { title, children, ...flexProps } = props;
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="3xs">
        {title && (
          <Heading fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  );
};
