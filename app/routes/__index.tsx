import {
  Box,
  Flex,
  HStack,
  Icon,
  Select,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import {
  Outlet,
  useFetcher,
  useNavigate,
  useSearchParams,
} from '@remix-run/react';
import type {
  ControlProps,
  LoadingIndicatorProps,
  OptionProps,
} from 'chakra-react-select';
import { chakraComponents, Select as CRSelect } from 'chakra-react-select';
import { debounce, range } from 'lodash';
import { DateTime } from 'luxon';
import { useEffect, useMemo, useState } from 'react';
import { FaChild, FaSchool } from 'react-icons/fa';
import { MdSchool, MdSearch } from 'react-icons/md';
import { typedjson, useTypedLoaderData } from 'remix-typedjson';

import { AlertED } from '~/components/AlertED';
import { Logo } from '~/components/Logo';
import { MobileHamburgerMenu } from '~/components/MobileHamburgerMenu';
import { NavMenu } from '~/components/NavMenu';
import { ProfileDropdown } from '~/components/ProfileDropdown';
import { useMobileMenuState } from '~/hooks/useMobileMenuState';
import { getLoggedInUser } from '~/services/users.service';
import { useSocket } from '~/socketContext';
import { useSelectedYear } from '~/util/utils';

import type { GlobalSearchResult } from './api/search/global';

export async function loader({ request }: LoaderArgs) {
  const user = await getLoggedInUser(request);

  return typedjson({ user });
}

const Control = ({ children, ...props }: ControlProps<GlobalSearchResult>) => (
  <chakraComponents.Control {...props}>
    <HStack align="center" justify="space-between" width="full">
      <Icon fontSize="lg" as={MdSearch} ml={2} mr={-3} color="gray.500" />
      <Box flex={1} id="testing" position="relative">
        {children}
      </Box>
    </HStack>
  </chakraComponents.Control>
);

const Option = ({ children, ...props }: OptionProps<GlobalSearchResult>) => (
  <chakraComponents.Option {...props}>
    <HStack align="center" width="full">
      <Icon
        fontSize="lg"
        as={
          props.data.type === 'participant'
            ? FaChild
            : props.data.type === 'program'
            ? MdSchool
            : FaSchool
        }
        color="gray.500"
      />
      <Box flex={1}>{children}</Box>
    </HStack>
  </chakraComponents.Option>
);

const LoadingIndicator = (props: LoadingIndicatorProps<GlobalSearchResult>) => (
  <Box position="absolute" top="7px" right={0}>
    <chakraComponents.LoadingIndicator
      // The color of the main line which makes up the spinner
      // This could be accomplished using `chakraStyles` but it is also available as a custom prop
      color="#A0AEC0" // <-- This default's to your theme's text color (Light mode: gray.700 | Dark mode: whiteAlpha.900)
      // The color of the remaining space that makes up the spinner
      emptyColor="transparent"
      // The `size` prop on the Chakra spinner
      // Defaults to one size smaller than the Select's size
      spinnerSize="sm"
      // A CSS <time> variable (s or ms) which determines the time it takes for the spinner to make one full rotation
      speed="0.45s"
      // A CSS size string representing the thickness of the spinner's line
      thickness="2px"
      // Don't forget to forward the props!
      {...props}
    />
  </Box>
);

// Empty React component required by Remix
export default function Dashboard() {
  let { user } = useTypedLoaderData<typeof loader>();
  let [searchParams, setSearchParams] = useSearchParams();
  let selectedYear = useSelectedYear();
  const socket = useSocket();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string | undefined>();
  const [searchResults, setSearchResults] = useState<GlobalSearchResult[]>([]);

  const showNotCurrentYear = selectedYear !== DateTime.now().year.toString();

  const globalSearch = useFetcher<GlobalSearchResult[]>();

  const isLoadingSearch = globalSearch.state === 'loading';

  const eventHandler = (newValue: string) => {
    setSearchValue(newValue);
  };

  const debouncedOnInputChange = useMemo(() => debounce(eventHandler, 500), []);

  useEffect(() => {
    if (searchValue && searchValue.trim().length > 0) {
      globalSearch.load(`/api/search/global?value=${searchValue}`);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!socket) return;

    socket.on('user-deactivated', (data) => {
      if (data?.userId === user?.id) {
        navigate('/logout');
      }
    });
  }, [socket]);

  useEffect(() => {
    if (globalSearch.data) {
      setSearchResults(globalSearch.data);
    }
  }, [globalSearch.data]);

  // use the user to render the UI of your private route
  const { isMenuOpen, toggle } = useMobileMenuState();
  const years = range(2015, DateTime.now().year + 1).map((year) =>
    year.toString(),
  );

  if (!user) throw new Error('User not found');

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
            display={{ base: 'none', xl: 'block' }}
            flexShrink={0}
            h="9"
            marginEnd="8"
            color="white"
          />

          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Mobile Logo placement */}
          <Logo
            flex={{ base: '1', xl: '0' }}
            display={{ xl: 'none' }}
            flexShrink={0}
            h="9"
            color="white"
          />

          <HStack spacing="6">
            <CRSelect
              instanceId="search-global"
              size="sm"
              placeholder="Buscar..."
              options={searchResults}
              isLoading={isLoadingSearch}
              noOptionsMessage={() => 'No se encontraron resultados'}
              onInputChange={debouncedOnInputChange}
              onBlur={() => {
                setSearchValue(undefined);
                setSearchResults([]);
              }}
              value={null}
              onChange={(newValue) => {
                if (newValue && 'type' in newValue) {
                  if (newValue?.type === 'participant') {
                    navigate(`/participants/${newValue.value}`);
                  }
                  if (newValue?.type === 'program') {
                    navigate(`/programs/${newValue.value}`);
                  }
                  if (newValue?.type === 'school') {
                    navigate(`/schools/${newValue.value}`);
                  }
                  setSearchResults([]);
                }
              }}
              chakraStyles={{
                container: (provided) => ({
                  ...provided,
                  color: 'gray.800',
                }),
                control: (provided) => ({
                  ...provided,
                  borderRadius: 'md',
                  minWidth: '250px',
                  bg: 'white',
                  color: 'gray.800',
                }),
                dropdownIndicator: (provided) => ({
                  ...provided,
                  bg: 'transparent',
                  display: 'none',
                  px: 2,
                  cursor: 'inherit',
                }),
                indicatorSeparator: (provided) => ({
                  ...provided,
                  display: 'none',
                }),
              }}
              components={{ Control, LoadingIndicator, Option }}
            />
            <Select
              maxWidth="100px"
              borderRadius="md"
              size="sm"
              value={selectedYear}
              onChange={(event) => {
                const selectedValue = event.currentTarget.value;
                searchParams.set('year', selectedValue);
                setSearchParams(searchParams);
              }}
            >
              {years.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </Select>
            {/* <Notification display={{ base: 'none', lg: 'inline-flex' }} /> */}

            <ProfileDropdown user={user} />
          </HStack>
        </Flex>
      </Flex>
      {showNotCurrentYear && (
        <AlertED
          status="warning"
          small
          description="Ojo! Estás navegando información que no es de este año. Se recomienda no hacer cambios en años anteriores."
        />
      )}

      <Outlet />
    </Flex>
  );
}
