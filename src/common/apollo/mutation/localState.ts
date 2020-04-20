import gql from 'graphql-tag';
import ApolloWrapper from '../../../core/Apollo';
import { setStorageItem } from '../../utils/storage';

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
      role
      __typename
    }
  }
`;
export const RESET_USER_ID = gql`
  mutation {
    resetUser @client
  }
`;
export const createLocalStateUser = async (user: Object) => {
  await setStorageItem('currentUser', JSON.stringify({ ...user, __typename: 'User' }));
  await ApolloWrapper.client.mutate({
    mutation: CREATE_UPDATE_USER,
    variables: { user: { ...user, __typename: 'User' } },
  });
};

export const updateLocalStateUser = async (additionalData: Object) => {
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
