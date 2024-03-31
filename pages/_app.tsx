import type { AppProps } from 'next/app';
import { ThemeContextProvider } from '@/app/contexts/theme-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();




function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
