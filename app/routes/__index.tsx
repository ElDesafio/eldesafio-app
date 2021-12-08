import {
  Box,
  Button,
  chakra,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { LoaderFunction, Outlet, redirect, useLoaderData } from "remix";
import { Flex, HStack, useColorModeValue as mode } from "@chakra-ui/react";

import { Logo } from "~/components/Logo";
import { MobileHamburgerMenu } from "~/components/MobileHamburgerMenu";
import { useMobileMenuState } from "~/hooks/useMobileMenuState";
import { User } from "~/models/user";
import { authenticator } from "~/services/auth.server";
import { NavMenu } from "~/components/NavMenu";
import { Notification } from "~/components/Notification";
import { ProfileDropdown } from "~/components/ProfileDropdown";

type RouteData = { user: User };

export let loader: LoaderFunction = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return user;
};

// Empty React component required by Remix
export default function Dashboard() {
  let { user } = useLoaderData<RouteData>();
  // use the user to render the UI of your private route
  const { isMenuOpen, toggle } = useMobileMenuState();
  return (
    <Flex
      direction="column"
      bg={mode("gray.100", "gray.800")}
      height="auto"
      minHeight="100vh"
    >
      <Flex align="center" bg="blue.600" color="white" px="6" minH="16">
        <Flex justify="space-between" align="center" w="full">
          <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
          <NavMenu.Mobile isOpen={isMenuOpen} />

          {/* Desktop Logo placement */}
          <Logo
            display={{ base: "none", lg: "block" }}
            flexShrink={0}
            h="16"
            marginEnd="12"
          />

          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Mobile Logo placement */}
          <Logo
            flex={{ base: "1", lg: "0" }}
            display={{ lg: "none" }}
            flexShrink={0}
            h="16"
          />

          <HStack spacing="3">
            <Notification display={{ base: "none", lg: "inline-flex" }} />
            <ProfileDropdown />
          </HStack>
        </Flex>
      </Flex>

      <Outlet />
    </Flex>
  );
}
