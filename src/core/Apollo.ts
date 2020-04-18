import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
  request: async operation => {
    const token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNrOHZnMzB2MzAwbTMwNzk2a2djcmVmNDMiLCJpYXQiOjE1ODY2MzY1MDd9.F4jOWx7Z7da9TT__YyN6kKN-Frb2YaZPhTSKGnwDcO0';
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  },
});

export default client;
