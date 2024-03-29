import type { UseMenuButtonProps } from '@chakra-ui/react';
import {
  Avatar,
  Box,
  chakra,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';

import type { LoggedInUser } from '~/services/users.service';

const UserAvatar = ({
  picture,
  name,
}: {
  picture: string | null;
  name: string;
}) => <Avatar size="sm" src={picture ?? undefined} name={name} />;

type ProfileMenuButtonProps = UseMenuButtonProps & {
  user: LoggedInUser;
};

const ProfileMenuButton = ({ user, ...rest }: ProfileMenuButtonProps) => {
  return (
    <MenuButton
      flexShrink={0}
      rounded="full"
      outline="0"
      _focus={{ shadow: 'outline' }}
      data-test="open user menu"
      {...rest}
    >
      <Box srOnly>Open user menu</Box>
      <UserAvatar
        name={`${user.firstName} ${user.lastName}`}
        picture={user.picture}
      />
    </MenuButton>
  );
};

export const ProfileDropdown = ({ user }: { user: LoggedInUser }) => {
  return (
    <Menu>
      <ProfileMenuButton user={user} />
      <MenuList
        as="div"
        rounded="md"
        shadow="lg"
        py="1"
        color={mode('gray.600', 'inherit')}
        fontSize="sm"
      >
        <HStack px="3" py="4">
          <UserAvatar
            name={`${user.firstName} ${user.lastName}`}
            picture={user.picture}
          />
          <Box lineHeight="1">
            <Text fontWeight="semibold">
              {user.firstName} {user.lastName}
            </Text>
            <Text mt="1" fontSize="xs" color="gray.500">
              {user.email}
            </Text>
          </Box>
        </HStack>
        <MenuItem as="a" cursor="pointer" fontWeight="medium">
          Editar Perfil
        </MenuItem>
        <MenuItem as="a" fontWeight="medium" color={mode('red.500', 'red.300')}>
          <Form method="post" action="/logout">
            <chakra.span as="button" fontWeight="medium">
              Cerrar Sesión
            </chakra.span>
          </Form>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
