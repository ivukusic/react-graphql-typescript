// tslint:disable: no-console
import ApolloClient from 'apollo-boost';

import { IDENTIFIERS } from 'common/constants';
import { getStorageItem, removeStorageItem, resetLocalStateUser, setStorageItem } from 'common/utils';

export const INITIAL_USER = {
  id: null,
  email: '',
  firstName: '',
  lastName: '',
  company: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  role: '',
  __typename: 'User',
};

class ApolloWrapper {
  client: any;
  token: string | null;

  constructor() {
    this.token = null;
    this.client = null;
    this.initialize = this.initialize.bind(this);
  }

  async setToken(token: string) {
    if (token) {
      await setStorageItem(IDENTIFIERS.token, token);
    } else {
      await removeStorageItem(IDENTIFIERS.token);
    }
    this.token = token;
  }

  async getToken() {
    this.token = await getStorageItem(IDENTIFIERS.token);
  }

  async initialize() {
    await this.getToken();
    const that = this;
    this.client = new ApolloClient({
      uri: 'http://localhost:8000/graphql',
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors);
        console.log('networkError', networkError);
        if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].message === 'Unauthorized') {
          resetLocalStateUser();
          setTimeout(() => {
            window.location.href = 'http://localhost:3000/';
          }, 1000);
        }
      },
      request: async operation => {
        if (that.token) {
          operation.setContext({
            headers: {
              authorization: `Bearer ${that.token}`,
            },
          });
        }
      },
      clientState: {
        defaults: {},
        resolvers: {
          Query: {
            currentUser: async () => {
              const data = await getStorageItem('currentUser');
              if (data) {
                return JSON.parse(data);
              }
              return INITIAL_USER;
            },
          },
          Mutation: {
            createUpdateUser: (_, { user }, { cache }) => {
              cache.writeData({ data: { currentUser: user } });
              return null;
            },
            resetUser: (_, __, { cache }) => {
              cache.writeData({
                data: { currentUser: INITIAL_USER },
              });
            },
          },
        },
      },
    });
  }
}

const client = new ApolloWrapper();
export default client;
