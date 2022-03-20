import { Box, HStack } from '@chakra-ui/react';
import type * as React from 'react';
import { Link as RemixLink } from 'remix';

interface NavItemProps {
  to?: string;
  active?: boolean;
  label: string;
}

interface DesktopNavItemProps extends NavItemProps {
  icon: React.ReactNode;
}

const DesktopNavItem = (props: DesktopNavItemProps) => {
  const { icon, label, to = '#', active } = props;
  return (
    <HStack
      as={RemixLink}
      aria-current={active ? 'page' : undefined}
      spacing="2"
      px="3"
      py="2"
      rounded="md"
      transition="all 0.2s"
      color="gray.200"
      _hover={{ bg: 'whiteAlpha.200' }}
      _activeLink={{ bg: 'blackAlpha.300', color: 'white' }}
      to={to}
    >
      {icon && (
        <Box aria-hidden fontSize="md">
          {icon}
        </Box>
      )}
      <Box fontWeight="semibold">{label}</Box>
    </HStack>
  );
};

const MobileNavItem = (props: NavItemProps) => {
  const { label, to = '#', active } = props;
  return (
    <Box
      as={RemixLink}
      display="block"
      to={to}
      px="3"
      py="3"
      rounded="md"
      fontWeight="semibold"
      aria-current={active ? 'page' : undefined}
      _hover={{ bg: 'whiteAlpha.200' }}
      _activeLink={{ bg: 'blackAlpha.300', color: 'white' }}
    >
      {label}
    </Box>
  );
};

export const NavItem = {
  Desktop: DesktopNavItem,
  Mobile: MobileNavItem,
};
