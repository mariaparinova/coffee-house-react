import './App.css';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer.tsx';
import { Header } from './components/Header/Header.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
