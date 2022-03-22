import type { AvatarProps } from '@chakra-ui/react';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { Link } from 'remix';

export const TooltipAvatar = ({
  linkTo,
  ...props
}: AvatarProps & { linkTo?: string }) => (
  <Tooltip label={props.name}>
    {linkTo !== undefined ? (
      <Link to={linkTo}>
        <Avatar {...props} />
      </Link>
    ) : (
      <Avatar {...props} />
    )}
  </Tooltip>
);
