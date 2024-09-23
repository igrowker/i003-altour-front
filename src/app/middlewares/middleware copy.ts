import { withAuth } from 'next-auth/middleware';

// Aplica la protección a todas las rutas que quieras proteger
export default withAuth({
  callbacks: {
    authorized: async ({ token }) => {
      // El token existe si el usuario está autenticado
      return !!token;
    },
  },
});

// Define qué rutas estarán protegidas (por ejemplo, 'prueba-guard1' y 'prueba-guard2')
//login y register no se protegen porque el usuario todavía no se ha registrado
export const config = {
  matcher: ['/prueba-guard1/:path*', '/prueba-guard2/:path*'], // Añadir las rutas que quieres proteger
};

