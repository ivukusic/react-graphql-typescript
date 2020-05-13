import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs';
import { useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';

import { QUERY_POSTS, MUTATION_DELETE_POST } from './PostList.gql';
import Table from '../../../common/components/Table';
import { PostEdgesType } from '../../../common/types';
import { MenuContext } from '../../../App';
import { extractMessageFromError } from '../../../common/utils/Error';

const tableFields = [
  { name: 'id', label: 'ID' },
  { name: 'title', label: 'Title' },
  { name: 'author', label: 'Author' },
  { name: 'published', label: 'Published' },
  { name: 'comments', label: 'Comments' },
  { name: 'date', label: 'Date' },
];

export const PostList = ({ history }: { history: any }): JSX.Element => {
  const { togglePopup } = useContext(MenuContext);

  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data, refetch } = useQuery(QUERY_POSTS, {
    variables: { first: itemsPerPage, skip: (currentPage - 1) * itemsPerPage },
  });
  const [deleteUser] = useMutation(MUTATION_DELETE_POST);

  useEffect(() => {
    if (history.location.state && history.location.state.refresh && data && data.usersConnection) {
      refetch();
    }
  }, [history, data, refetch]);

  const goToPage = (page: number) => () => {
    setCurrentPage(page);
  };

  const setItems = (value: number) => {
    setCurrentPage(1);
    setItemsPerPage(value);
  };

  const transformData = (data: Array<PostEdgesType>): Array<PostEdgesType> =>
    data.map(({ node }: any) => ({
      ...node,
      author: `${node.author.firstName} ${node.author.lastName}`,
      date: dayjs(node.createdAt).format('DD.MM.YYYY'),
      published: node.published ? 'Yes' : 'No',
      comments: node.commentsConnection.totalCount || '-',
    }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  const onDelete = (id: number) => () => {
    togglePopup({
      cb: async (onSuccess: any, onError: any) => {
        try {
          await deleteUser({ variables: { where: { id } } });
          refetch();
          onSuccess();
        } catch ({ graphQLErrors }) {
          onError(extractMessageFromError(graphQLErrors));
        }
      },
      title: 'Delete user',
      message: `Are you sure you want to delete user with id "${id}"?`,
    });
  };

  const generateLink = (id: number) => {
    return `/post/${id}/edit`;
  };

  return (
    <div>
      <Table
        currentPage={currentPage}
        data={transformData(data.postsConnection.edges)}
        fields={tableFields}
        itemsPerPage={itemsPerPage}
        link={generateLink}
        name="Posts"
        goToPage={goToPage}
        onDelete={onDelete}
        pageInfo={data.postsConnection.pageInfo}
        totalCount={data.postsConnection.totalCount}
        setItemsPerPage={setItems}
      />
    </div>
  );
};

export default withRouter(PostList);
