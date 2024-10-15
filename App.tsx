import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import awsconfig from '../typescript/src/aws-exports';
import UserScreen from './src/UserScreen';

const client = new ApolloClient({
  uri: awsconfig.aws_appsync_graphqlEndpoint,
  cache: new InMemoryCache(),
  headers: {
    'x-api-key': awsconfig.aws_appsync_apiKey,
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserScreen />
    </ApolloProvider>
  );
};

export default App;
