import gql from 'graphql-tag';

export const QUERY_POSTS = gql`
  query($first: Int, $skip: Int, $where: PostWhereInput) {
    postsConnection(first: $first, skip: $skip, where: $where) {
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
            id
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
    users {
      id
      firstName
      lastName
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
