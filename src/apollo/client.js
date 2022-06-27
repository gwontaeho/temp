import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://172.30.1.2:3000',
  cache: new InMemoryCache(),
});
