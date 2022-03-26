import type { AvatarProps } from '@chakra-ui/react';
import { Avatar, Tooltip } from '@chakra-ui/react';

import { LinkED } from './LinkED';

export const TooltipAvatar = ({
  linkTo,
  ...props
}: AvatarProps & { linkTo?: string }) => (
  <Tooltip label={props.name}>
    {linkTo !== undefined ? (
      <LinkED to={linkTo}>
        <Avatar {...props} />
      </LinkED>
    ) : (
      <Avatar {...props} />
    )}
  </Tooltip>
);
