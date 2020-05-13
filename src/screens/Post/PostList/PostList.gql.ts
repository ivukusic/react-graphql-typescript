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
          published
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

export const MUTATION_DELETE_POST = gql`
  mutation deletePost($where: PostWhereUniqueInput!) {
    deletePost(where: $where) {
      id
      title
      body
      published
    }
  }
`;
