import { FC } from 'react';
import { Box, useTheme } from '@mui/material';

export interface SpacerProps {
  x?: number;
  y?: number;
  basis?: number;
}

export const Spacer: FC<SpacerProps> = (props) => {
  const { x, y, basis } = props;

  const theme = useTheme();

  return (
    <Box
      width={x ? theme.spacing(x) : undefined}
      height={y ? theme.spacing(y) : undefined}
      flexBasis={basis ? theme.spacing(basis) : undefined}
    />
  );
};
