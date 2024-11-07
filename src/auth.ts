import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        id: { type: 'text' },
        username: { type: 'text' }

      },
      authorize(credentials) {
        if (
          credentials?.id &&
          credentials.username 
        ) {
          return { id: credentials?.id, name: credentials?.username };
        }
        return null;
      }
    })
  ]
};

export default auth;