import {
  Box,
  Container,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { TabLink } from '~/components/TabLink';

export default function Participants() {
  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.900')} pt="8" shadow="sm">
        <Container maxW="7xl">
          <Heading size="md" mb="3">
            Admin
          </Heading>
          <Stack direction="row" spacing="4">
            <TabLink aria-current="page" href="#">
              Overview
            </TabLink>
            <TabLink href="#">Analytics</TabLink>
            <TabLink href="#">Automation</TabLink>
          </Stack>
        </Container>
      </Box>

      <Box as="main" py="8" flex="1">
        <Container maxW="7xl">
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p="6"
            rounded="lg"
            shadow="base"
          >
            <Box
              border="3px dashed currentColor"
              color={useColorModeValue('gray.200', 'gray.600')}
              h="96"
              rounded="lg"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
