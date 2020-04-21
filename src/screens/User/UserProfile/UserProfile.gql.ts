import gql from 'graphql-tag';

import { USER_FRAGMENT } from '../../../common/apollo/fragments/user.gql';

export const QUERY_USER_PROFILE = gql`
  query {
    currentUser @client {
      id
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const MUTATION_UPDATE_USER = gql`
  mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateUser(data: $data, where: $where) {
      id
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
