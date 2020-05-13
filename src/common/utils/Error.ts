import { get } from 'lodash';
import { capitalize } from './String';

export const extractMessageFromError = (graphQLErrors: any) => {
  let message = "Something went wrong. Maybe it's your internet connection";
  if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].message) {
    message = graphQLErrors[0].message;
    if (message === 'Bad Request Exception') {
      message = get(graphQLErrors[0], 'extensions.exception.response.message[0]', message);
    }
  }
  return capitalize(message);
};
