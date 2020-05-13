import gql from 'graphql-tag';

export const QUERY_POST = gql`
  query post($where: PostWhereUniqueInput!) {
    post(where: $where) {
      id
      title
      body
      published
    }
  }
`;

export const MUTATION_CREATE_POST = gql`
  mutation createPost($data: PostCreateWithoutAuthorInput!) {
    createPost(data: $data) {
      id
      body
      title
      published
    }
  }
`;

export const MUTATION_UPDATE_POST = gql`
  mutation updatePost($data: PostUpdateInput!, $where: PostWhereUniqueInput!) {
    updatePost(data: $data, where: $where) {
      id
      body
      title
      published
    }
  }
`;
