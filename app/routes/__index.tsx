import {
  Flex,
  HStack,
  Select,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import type { User } from '@prisma/client';
import { range } from 'lodash';
import { DateTime } from 'luxon';
import type { LoaderFunction } from 'remix';
import { Outlet, useLoaderData, useSearchParams } from 'remix';

import { Logo } from '~/components/Logo';
import { MobileHamburgerMenu } from '~/components/MobileHamburgerMenu';
import { NavMenu } from '~/components/NavMenu';
import { ProfileDropdown } from '~/components/ProfileDropdown';
import { useMobileMenuState } from '~/hooks/useMobileMenuState';
import { authenticator } from '~/services/auth.server';
import { useSelectedYear } from '~/util/utils';

export let loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });
  console.log(user);
  return user;
};

// Empty React component required by Remix
export default function Dashboard() {
  let user = useLoaderData<User>();
  let [, setSearchParams] = useSearchParams();
  let selectedYear = useSelectedYear();

  console.log(user);

  // use the user to render the UI of your private route
  const { isMenuOpen, toggle } = useMobileMenuState();
  const years = range(2015, DateTime.now().year + 1).map((year) =>
    year.toString(),
  );

  return (
    <Flex
      direction="column"
      bg={mode('gray.100', 'gray.800')}
      height="auto"
      minHeight="100vh"
    >
      <Flex align="center" bg="blue.600" color="white" px="6" minH="16">
        <Flex justify="space-between" align="center" w="full">
          <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
          <NavMenu.Mobile isOpen={isMenuOpen} />

          {/* Desktop Logo placement */}
          <Logo
            display={{ base: 'none', lg: 'block' }}
            flexShrink={0}
            h="16"
            marginEnd="12"
          />

          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Mobile Logo placement */}
          <Logo
            flex={{ base: '1', lg: '0' }}
            display={{ lg: 'none' }}
            flexShrink={0}
            h="16"
          />

          <HStack spacing="3">
            {/* <Notification display={{ base: "none", lg: "inline-flex" }} /> */}
            <Select
              maxWidth="100px"
              size="sm"
              marginRight="3"
              value={selectedYear}
              onChange={(event) => {
                const selectedValue = event.currentTarget.value;
                const currentYear = DateTime.now().year.toString();
                const newSearchparams: { year: string } | {} =
                  selectedValue === currentYear ? {} : { year: selectedValue };
                setSearchParams(newSearchparams);
              }}
            >
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </Select>

            <ProfileDropdown user={user} />
          </HStack>
        </Flex>
      </Flex>

      <Outlet />
    </Flex>
  );
}
