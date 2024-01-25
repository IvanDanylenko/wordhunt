import { FC } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';
import { NextLink, NextLinkProps } from '../links';

export interface ButtonProps
  extends MuiButtonProps,
    Omit<NextLinkProps, 'href' | 'onTouchStart' | 'onClick' | 'onMouseEnter'> {
  loading?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, variant = 'contained', loading, disabled, ...rest } = props;

  return (
    <MuiButton variant={variant} disabled={loading || disabled} LinkComponent={NextLink} {...rest}>
      {loading ? (
        <CircularProgress
          sx={{ color: variant === 'contained' ? 'common.white' : 'text.secondary' }}
          size={20}
        />
      ) : (
        children
      )}
    </MuiButton>
  );
};
