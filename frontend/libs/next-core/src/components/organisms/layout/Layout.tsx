import { FC, ReactNode } from 'react';
import { Container } from '@mui/material';
import { Spacer } from '../../atoms';
import { Footer } from './Footer';
import { Header } from './Header';

export interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  return (
    <>
      <Header />
      <Spacer y={5} />
      <Container>{children}</Container>
      <Footer />
    </>
  );
};
