import gql from 'graphql-tag';
import { USER_FRAGMENT } from '../../../common/apollo/fragments/user.gql';

export const QUERY_USERS = gql`
  query($first: Int, $skip: Int) {
    usersConnection(first: $first, skip: $skip) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          ...UserFragment
        }
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const MUTATION_DELETE_USER = gql`
  mutation deleteUser($where: UserWhereUniqueInput!) {
    deleteUser(where: $where) {
      id
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
