import React,{useEffect} from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider,gql } from '@apollo/client';
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
  useEffect(() => {
    const testGraphQLEndpoint = async () => {
      const endpoint = awsconfig.aws_appsync_graphqlEndpoint; 
      const LIST_USERS_QUERY = gql`
  query ListZellerCustomers {
    listZellerCustomers(filter: { role: { eq: "Manager" } }) {
      items {
        id
        name
        role
      }
    }
  }
`;
    
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': awsconfig.aws_appsync_apiKey, // If you're using an API key
          },
          body: JSON.stringify({
            query: LIST_USERS_QUERY
          }),
        });

        const data = await response.json();
        console.log('Response from GraphQL endpoint:', data);

        if (response.ok) {
          console.log('Endpoint is working correctly.');
        } else {
          console.log('Endpoint returned an error:', data);
        }
      } catch (error) {
        console.error('Error reaching GraphQL endpoint:', error);
      }
    };

    testGraphQLEndpoint();
  }, []);
  return (
    <ApolloProvider client={client}>
      <UserScreen />
    </ApolloProvider>
  );
};

export default App;
