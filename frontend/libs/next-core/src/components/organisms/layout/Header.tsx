import { FC } from 'react';
import { AppBar, Container, Grid } from '@mui/material';
import logo from './logo.png';
import { Image, Link } from '../../atoms';

export const Header: FC = () => {
  return (
    <AppBar position="static">
      <Container>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item sm={2}>
            <Image href="/" src={logo} />
          </Grid>
          <Grid item sm={5} container gap={2} justifyContent="center">
            <Link href="/login" color="common.white" underline="none">
              Exercises
            </Link>
            <Link href="/register" color="common.white" underline="none">
              Scanner
            </Link>
          </Grid>
          <Grid item sm={5} container justifyContent="flex-end" gap={2}>
            <Link href="/login" color="common.white" underline="none">
              Login
            </Link>
            <Link href="/register" color="common.white" underline="none">
              Register
            </Link>
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  );
};
