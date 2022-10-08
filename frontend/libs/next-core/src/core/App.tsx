import { QueryClientProvider } from 'react-query';
import { CacheProvider, EmotionCache } from '@emotion/react';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { Notification } from '../components';
import { NotificationContextProvider } from '../contexts';
import { createQueryClient, ThemeProvider } from '../providers';
import { createEmotionCache } from '../theme';

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const queryClient = createQueryClient();

export const App = (props: AppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps = {} } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NotificationContextProvider>
            <Component {...pageProps} />
            <Notification />
          </NotificationContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
};
