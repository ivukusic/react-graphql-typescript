import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    email
    description
    firstName
    lastName
    company
    address
    city
    postalCode
    country
    role
  }
`;
