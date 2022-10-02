import { FC, ReactNode } from 'react';
import { Container } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import { Spacer } from '../../atoms';

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
