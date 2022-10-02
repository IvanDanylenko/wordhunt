import { FC } from 'react';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { NextLink, NextLinkProps } from './NextLink';

export type LinkProps = MuiLinkProps & NextLinkProps;

export const Link: FC<LinkProps> = (props) => {
  const { children, href, ...rest } = props;

  return (
    <MuiLink component={href ? NextLink : 'span'} href={href} {...rest}>
      {children}
    </MuiLink>
  );
};
