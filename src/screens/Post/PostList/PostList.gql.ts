import gql from 'graphql-tag';

export const QUERY_POSTS = gql`
  query($first: Int, $skip: Int) {
    postsConnection(first: $first, skip: $skip) {
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          body
          author {
            firstName
            lastName
          }
          createdAt
          updatedAt
          commentsConnection {
            aggregate {
              count
            }
          }
        }
      }
    }
  }
`;
