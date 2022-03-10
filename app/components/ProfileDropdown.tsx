import type { UseMenuButtonProps } from '@chakra-ui/react';
import {
  Avatar,
  Box,
  chakra,
  Flex,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue as mode,
  useMenuButton,
} from '@chakra-ui/react';
import type { User } from '@prisma/client';
import { Form } from 'remix';

const UserAvatar = ({
  picture,
  name,
}: {
  picture: string | null;
  name: string;
}) => <Avatar size="sm" src={picture ?? undefined} name={name} />;

type ProfileMenuButtonProps = UseMenuButtonProps & {
  user: User;
};

const ProfileMenuButton = ({ user, ...rest }: ProfileMenuButtonProps) => {
  const buttonProps = useMenuButton(rest);
  return (
    <Flex
      {...buttonProps}
      as="button"
      flexShrink={0}
      rounded="full"
      outline="0"
      _focus={{ shadow: 'outline' }}
    >
      <Box srOnly>Open user menu</Box>
      <UserAvatar
        name={`${user.firstName} ${user.lastName}`}
        picture={user.picture}
      />
    </Flex>
  );
};

export const ProfileDropdown = ({ user }: { user: User }) => {
  return (
    <Menu>
      <ProfileMenuButton user={user} />
      <MenuList
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
        <MenuItem fontWeight="medium">Editar Perfil</MenuItem>
        <MenuItem fontWeight="medium" color={mode('red.500', 'red.300')}>
          <Form method="post" action="/logout">
            <chakra.span as={'button'} fontWeight="medium">
              Cerrar Sesión
            </chakra.span>
          </Form>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
