import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import type { ThrownResponse } from '@remix-run/react';
import { useNavigate } from '@remix-run/react';

type ErrorProps = {
  caught: ThrownResponse<number, any>;
};

export function ErrorCaught({ caught }: ErrorProps) {
  const navigate = useNavigate();

  return (
    <Box padding="6" margin="0 auto" textAlign="center">
      <Stack direction="column" spacing="4">
        <Heading size="4xl">{caught.status}</Heading>
        <Text>{caught.statusText}</Text>
        <div>
          <Button colorScheme="blue" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </div>
      </Stack>
    </Box>
  );
}
