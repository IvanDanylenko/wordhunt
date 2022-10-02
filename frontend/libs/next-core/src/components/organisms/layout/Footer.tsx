import { FC } from 'react';
import { Container, Typography, Divider } from '@mui/material';

export const Footer: FC = () => {
  return (
    <Container>
      <Divider sx={{ my: 3 }} />
      <Typography>Footer</Typography>
    </Container>
  );
};
