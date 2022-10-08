import { FC, ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@mui/material';
import { Loader } from './Loader';

export interface QueryBoudnaryProps {
  children: ReactNode;
}

const FallbackComponent = () => {
  return <Alert severity="error">Something went wrong</Alert>;
};

// FIXME: throws an error when it wraps react query hook. Need to investigate
export const QueryBoundary: FC<QueryBoudnaryProps> = (props) => {
  const { children } = props;
  return (
    <ErrorBoundary FallbackComponent={FallbackComponent}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
