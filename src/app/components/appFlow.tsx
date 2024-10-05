'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Onboarding from './onBoarding/onboarding';
import LoginForm from './Auth/login-form';
import { useSession } from 'next-auth/react';


export default function AppFlow() {
  const { data: session, status } = useSession();
  const [showSplash, setShowSplash] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fadeIn = setTimeout(() => {
      setOpacity(100);
    }, 100);

    const showLoginTimeout = setTimeout(() => {
      setShowSplash(false);
      if (status === 'authenticated') {
        setShowOnboarding(true); // Mostrar el onboarding si está autenticado
      }
    }, 3000); // Reducir el tiempo de splash a 3 segundos para prueba


    return () => {
      clearTimeout(fadeIn);
      clearTimeout(showLoginTimeout);
    };
  }, [status]);

  const handleLogin = () => {
    setShowOnboarding(true); // Mostrar siempre el onboarding después de login
  };

  const handleOnboardingComplete = () => {
    router.push('/home'); // Ir a home solo cuando el onboarding se complete
  };

  if (showSplash) {
    return (
      <div className="flex items-center justify-center h-screen bg-yellow-100">
        <div
          className={`transition-opacity duration-1000 ease-in`}
          style={{ opacity: opacity / 100 }}
        >
          <Image
            src="/altour.png"
            alt="Altour Logo"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    );
  }

  if (status !== 'authenticated') {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return null;
}
