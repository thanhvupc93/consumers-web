import {AuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const auth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {type: 'text'},
        fullName: {type: 'text'}
      },
      authorize(credentials) {
        if (
          credentials?.username  &&
          credentials.fullName 
        ) {
          return {id: credentials?.username, name: credentials?.fullName};
        }
        return null;
      }
    })
  ]
};

export default auth;