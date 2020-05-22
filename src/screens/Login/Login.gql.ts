import gql from 'graphql-tag';

import { USER_FRAGMENT } from 'common/apollo/fragments/user.gql';

export const MUTATION_LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      id
      jwt
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
