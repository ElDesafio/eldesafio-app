import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { LoaderFunction } from "remix";

import { CardAuth } from "~/components/CardAuth";
import { LinkUI } from "~/components/LinkUI";
import { Logo } from "~/components/Logo";
import { PasswordField } from "~/components/PasswordField";
import { authenticator } from "~/services/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const user = await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
  console.log({ user });
  return user;
};

export default function Login() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "inherit")}
      minH="100vh"
      py="12"
      px={{ base: "4", lg: "8" }}
    >
      <Box maxW="md" mx="auto">
        <Logo mx="auto" h="8" mb={{ base: "10", md: "20" }} />
        <Heading textAlign="center" size="xl" fontWeight="extrabold">
          Sign in to your account
        </Heading>
        <CardAuth>
          <chakra.form action="/auth/auth0" method="post">
            <Stack spacing="6">
              {/* <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </FormControl>
              <PasswordField /> */}
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                Sign in
              </Button>
            </Stack>
          </chakra.form>
        </CardAuth>
      </Box>
    </Box>
  );
}
