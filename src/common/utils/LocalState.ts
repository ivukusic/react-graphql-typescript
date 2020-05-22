import gql from 'graphql-tag';

import ApolloWrapper from '../../core/Apollo';
import { USER_FRAGMENT } from '../apollo/fragments/user.gql';
import { setStorageItem } from './Storage';

/**
 * mutations for updating local state currentUser
 */
export const CREATE_UPDATE_USER = gql`
  mutation($user: User) {
    createUpdateUser(user: $user) @client
  }
`;
export const READ_LOCAL_PERSON = gql`
  {
    currentUser @client {
      id
      ...UserFragment
      __typename
    }
  }
  ${USER_FRAGMENT}
`;
export const RESET_USER_ID = gql`
  mutation {
    resetUser @client
  }
`;
export const createLocalStateUser = async (user: object, token: string) => {
  ApolloWrapper.setToken(token);
  await setStorageItem('currentUser', JSON.stringify({ ...user, __typename: 'User' }));
  await ApolloWrapper.client.mutate({
    mutation: CREATE_UPDATE_USER,
    variables: { user: { ...user, __typename: 'User' } },
  });
};

export const updateLocalStateUser = async (additionalData: object) => {
  const { data } = await ApolloWrapper.client.query({ query: READ_LOCAL_PERSON });
  if (data && data.currentUser && data.currentUser.id) {
    const newUser = { ...data.currentUser, ...additionalData };
    await setStorageItem('currentUser', JSON.stringify(newUser));
    await ApolloWrapper.client.mutate({ mutation: CREATE_UPDATE_USER, variables: { user: newUser } });
  }
};

export const resetLocalStateUser = async (token?: string) => {
  localStorage.clear();
  await ApolloWrapper.setToken('');
  await ApolloWrapper.client.mutate({ mutation: RESET_USER_ID });
};
