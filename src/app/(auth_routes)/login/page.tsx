//import AltourLogo from '@/app/ui/altour-logo';
'use client'

import LoginForm from '@/app/components/Auth/login-form';
import { useRouter } from 'next/navigation';
 
export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    
    localStorage.setItem('isAuthenticated', 'true');
    // Redirige al usuario al onboarding
    router.push('/onboarding');
  };

  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      <LoginForm onLogin={handleLogin} />
      </div>
    </main>
  );
}