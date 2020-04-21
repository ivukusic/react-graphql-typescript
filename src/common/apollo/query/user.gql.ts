import gql from 'graphql-tag';
import { USER_FRAGMENT } from '../fragments/user.gql';

export const QUERY_CURRENT_USER = gql`
  {
    currentUser @client {
      id
      ...UserFragment
      __typename
    }
  }
  ${USER_FRAGMENT}
`;
