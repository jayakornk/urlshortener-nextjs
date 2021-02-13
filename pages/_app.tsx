import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'next-auth/client';
import { SWRConfig } from 'swr';

import { Layout } from '@/components/Layout';
import fetcher from '@/utils/fetcher';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { session } = pageProps;
  console.log('session', session);
  return (
    <Provider session={session}>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </Provider>
  );
}

export default MyApp;
