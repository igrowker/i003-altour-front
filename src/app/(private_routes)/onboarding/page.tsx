'use client';

import { useState } from 'react';
import Onboarding from '../../components/onBoarding/onboarding';

export default function OnBoardingPage() {

  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
     // Opcional: guardar en localStorage que el usuario ha completado el onboarding
    localStorage.setItem('hasSeenOnboarding', 'true');
  };
  return (
    <main>
      <Onboarding onComplete={handleOnboardingComplete} /> 
    </main>
  );
}