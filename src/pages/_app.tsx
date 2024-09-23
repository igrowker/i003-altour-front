import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import Loading from '../app/components/loading'; // Importamos el componente de carga

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };
    
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </>
  );
};

export default MyApp;
