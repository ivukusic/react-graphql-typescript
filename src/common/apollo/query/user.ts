import gql from 'graphql-tag';

export const QUERY_CURRENT_USER = gql`
  {
    currentUser @client {
      id
      email
      role
      __typename
    }
  }
`;
