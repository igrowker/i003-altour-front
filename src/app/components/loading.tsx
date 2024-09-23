'use client';
import { useEffect } from 'react';
import { grid } from 'ldrs';

export default function Loading() {
  useEffect(() => {
    // Esto se asegura de que `grid.register()` solo se ejecute en el cliente
    if (typeof window !== 'undefined') {
      grid.register();
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {/* Solo renderizamos el componente si estamos en el cliente */}
        {typeof window !== 'undefined' && (
          <l-grid size="60" speed="1.5" color="black"></l-grid>
        )}
        <p className="mt-4 text-xl font-semibold text-primary">Loading...</p>
      </div>
    </div>
  );
}
