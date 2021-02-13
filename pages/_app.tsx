import '../styles/globals.css';

import { GeistProvider } from '@geist-ui/react';
import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { SWRConfig } from 'swr';

import { Layout } from '@/components/Layout';
import fetcher from '@/utils/fetcher';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { session } = pageProps;
  console.log('session', session);
  return (
    <GeistProvider>
      <Provider session={session}>
        <SWRConfig value={{ fetcher }}>
          {/* <CssBaseline /> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </Provider>
    </GeistProvider>
  );
}

export default MyApp;
