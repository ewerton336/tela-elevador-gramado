// Em pages/index.tsx
import Avisos from '@/app/components/avisos/avisos';
import NewsCarousel from '@/app/components/news/newsCarousel';
import Weather from '@/app/components/weather/weather';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

const Home = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Weather />
        <NewsCarousel />
        <Avisos />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
