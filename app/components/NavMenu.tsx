/* eslint-disable sonarjs/no-duplicate-string */
import { Box, Flex, HStack } from '@chakra-ui/react';
import { AiOutlineTeam } from 'react-icons/ai';
import { FaChild, FaSchool } from 'react-icons/fa';
import { MdGroup, MdOutlineFamilyRestroom, MdSchool } from 'react-icons/md';
import { useLocation } from 'remix';

import { NavItem } from './NavItem';

const MobileNavMenu = (props: { isOpen?: boolean }) => {
  const location = useLocation();
  const navItems = [
    {
      label: 'Participantes',
      to: '/participants',
      active: location.pathname.startsWith('/participants'),
      icon: <FaChild />,
    },
    {
      label: 'Programas',
      to: '/programs',
      active: location.pathname.startsWith('/programs'),
      icon: <MdSchool />,
    },
    {
      label: 'Staff',
      to: '/staff',
      active: location.pathname.startsWith('/staff'),
      icon: <AiOutlineTeam />,
    },
    {
      label: 'Familiares',
      to: '/family',
      active: location.pathname.startsWith('/family'),
      icon: <MdOutlineFamilyRestroom />,
    },
    {
      label: 'Escuelas',
      to: '/schools',
      active: location.pathname.startsWith('/schools'),
      icon: <FaSchool />,
    },
    // {
    //   label: 'Admin',
    //   to: '/admin',
    //   active: location.pathname.includes('/admin'),
    //   icon: <MdAdminPanelSettings />,
    // },
  ];

  const { isOpen } = props;

  return (
    <Flex
      hidden={!isOpen}
      as="nav"
      direction="column"
      bg="blue.600"
      position="fixed"
      height="calc(100vh - 4rem)"
      top="16"
      insetX="0"
      zIndex={10}
      w="full"
    >
      <Box px="4">
        {navItems.map((navItem) => (
          <NavItem.Mobile
            to={navItem.to}
            active={navItem.active}
            label={navItem.label}
            key={navItem.label}
          />
        ))}
      </Box>
    </Flex>
  );
};

const DesktopNavMenu = () => {
  const location = useLocation();
  const navItems = [
    {
      label: 'Participantes',
      to: '/participants',
      active: location.pathname.startsWith('/participants'),
      icon: <FaChild />,
    },
    {
      label: 'Programas',
      to: '/programs',
      active: location.pathname.startsWith('/programs'),
      icon: <MdSchool />,
    },
    {
      label: 'Familiares',
      to: '/family',
      active: location.pathname.startsWith('/family'),
      icon: <MdOutlineFamilyRestroom />,
    },
    {
      label: 'Escuelas',
      to: '/schools',
      active: location.pathname.startsWith('/schools'),
      icon: <FaSchool />,
    },
    {
      label: 'Staff',
      to: '/staff',
      active: location.pathname.startsWith('/staff'),
      icon: <AiOutlineTeam />,
    },
    // {
    //   label: 'Admin',
    //   to: '/admin',
    //   active: location.pathname.startsWith('/admin'),
    //   icon: <MdAdminPanelSettings />,
    // },
  ];
  return (
    <HStack spacing="3" flex="1" display={{ base: 'none', lg: 'flex' }}>
      {navItems.map((navItem) => (
        <NavItem.Desktop
          to={navItem.to}
          icon={navItem.icon}
          active={navItem.active}
          label={navItem.label}
          key={navItem.label}
        />
      ))}
    </HStack>
  );
};

export const NavMenu = {
  Mobile: MobileNavMenu,
  Desktop: DesktopNavMenu,
};
