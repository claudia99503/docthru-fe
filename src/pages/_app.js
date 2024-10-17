import {
  HydrationBoundary,
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/context/AuthProvider';
import '@/styles/globals.css';
import React from 'react';
import Layout from '@/components/layouts/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
          },
          mutation: {
            retry: 1,
          },
        },
        mutationCache: new MutationCache({
          onError: (error) => {
            console.error('Mutation Error', error.message || 'Unknown Error');
          },
        }),
      })
  );

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </HydrationBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
