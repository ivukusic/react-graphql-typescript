import gql from 'graphql-tag';

export const MUTATION_LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      id
      email
      role
      jwt
    }
  }
`;
