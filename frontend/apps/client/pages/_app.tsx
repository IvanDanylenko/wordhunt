import { AppProps } from 'next/app';
import Head from 'next/head';
import { App } from '@wordhunt/next-core';

function CustomApp(props: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to client!</title>
      </Head>
      <App {...props} />
    </>
  );
}

export default CustomApp;
