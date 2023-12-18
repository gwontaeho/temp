import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
  uri: 'http://172.30.1.2:3000',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
