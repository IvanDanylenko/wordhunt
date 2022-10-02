import { FC } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { NextLink, NextLinkProps } from '../links';

export type ButtonProps = MuiButtonProps & Partial<NextLinkProps>;

export const Button: FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <MuiButton variant="contained" LinkComponent={NextLink} {...rest}>
      {children}
    </MuiButton>
  );
};
