import NextAuth from "next-auth";
//OAuth Google Authentication
import GoogleProvider from "next-auth/providers/google";

//Credentials Authentication
import CredentialsProvider from "next-auth/providers/credentials";
//import { compare } from "bcrypt" //TODO: Eliminar bcrypt si no es necesario después de integración.

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "user@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // FIXME: Añadir la lógica aquí para buscar el usuario en la base de datos y comparar las credenciales proporcionadas con el usuario de la BD
        const user = { id: "1", name: "John", email: credentials?.email }; //usuario hardcodeado - implementar lógica para buscar al usario en BD

        // Aquí puedes validar las credenciales con tu base de datos o API
        if (
          credentials?.email === "user@example.com" &&
          credentials?.password === "password123"
        ) {
          console.log("credentials", credentials)
          console.log("user", user)
          return user; // El usuario está autenticado correctamente
        } else {
          return null; // La autenticación falla si las credenciales no coinciden
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Redirige al login si no está autenticado
  },

  // session: {
  //   strategy: "jwt",
  // },

  callbacks: {
    async session({ session, token }) {
      // Asigna token.user a session.user, asegurando que el tipo de token.user es correcto
      if (token?.user) {
        session.user = token.user as { name?: string | null; email?: string | null; image?: string | null };
      }
      return session;
    },
    async jwt({ token, user }) {
      // Si es la primera vez, añade el user al token
      if (user) {
        token.user = user;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

//TODO: Ejemplo de código para implementar con SQL comparativa credenciales usuario vs usuario BD

/*[
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: "Credentials",
    credentials: {
      email: {},
      password: {},
    },
    async authorize(credentials, req) {
      const response = await sql`
        SELECT * FROM users WHERE email=${credentials?.email}
      `;
      const user = response.rows[0];

      const passwordCorrect = await compare(
        credentials?.password || "",
        user.password
      );

      if (passwordCorrect) {
        return {
          id: user.id,
          email: user.email,
        };
      }

      console.log("credentials", credentials);
      return null;
    },
  }),
],
*/

//TODO: otra opción, compara con la anterior:

/*import bcrypt from "bcrypt";

async function authorize(credentials: { email: string, password: string }) {
  const user = await findUserByEmail(credentials.email); // Busca el usuario en la base de datos

  if (user && await bcrypt.compare(credentials.password, user.hashedPassword)) {
    return user;  // Si las contraseñas coinciden, devuelve el usuario
  }
  return null; // Si no coinciden, devuelve null
}*/