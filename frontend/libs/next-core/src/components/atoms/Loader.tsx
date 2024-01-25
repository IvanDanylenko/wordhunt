import { FC } from 'react';
import { CircularProgress, Grid } from '@mui/material';

export const Loader: FC = () => {
  return (
    <Grid container justifyContent="center">
      <CircularProgress size={30} />
    </Grid>
  );
};
