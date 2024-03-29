import { Box } from '@chakra-ui/react';
import { HiOutlineMenu, HiX } from 'react-icons/hi';

interface MobileHamburgerMenuProps {
  onClick?: VoidFunction;
  isOpen: boolean;
}

export const MobileHamburgerMenu = (props: MobileHamburgerMenuProps) => {
  const { onClick, isOpen } = props;
  return (
    <Box ms="-4" minW={{ base: '12', xl: '76px' }} display={{ xl: 'none' }}>
      <Box as="button" onClick={onClick} p="2" fontSize="xl">
        <Box aria-hidden as={isOpen ? HiX : HiOutlineMenu} />
        <Box srOnly>{isOpen ? 'Close menu' : 'Open menu'}</Box>
      </Box>
    </Box>
  );
};
