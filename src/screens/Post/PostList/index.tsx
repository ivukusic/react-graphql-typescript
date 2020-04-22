import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs';

import { QUERY_POSTS } from './PostList.gql';
import Table from '../../../common/components/Table';
import { PostEdgesType } from '../../../common/types';

const tableFields = [
  { name: 'id', label: 'ID' },
  { name: 'title', label: 'Title' },
  { name: 'author', label: 'Author' },
  { name: 'comments', label: 'Comments' },
  { name: 'date', label: 'Date' },
];

export const PostList = (): JSX.Element => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, error, data } = useQuery(QUERY_POSTS, {
    variables: { first: itemsPerPage, skip: (currentPage - 1) * itemsPerPage },
  });

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
      comments: node.commentsConnection.totalCount || '-',
    }));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error! ${error.message}`}</div>;

  return (
    <div>
      <Table
        currentPage={currentPage}
        data={transformData(data.postsConnection.edges)}
        fields={tableFields}
        itemsPerPage={itemsPerPage}
        name="Posts"
        goToPage={goToPage}
        pageInfo={data.postsConnection.pageInfo}
        totalCount={data.postsConnection.totalCount}
        setItemsPerPage={setItems}
      />
    </div>
  );
};

export default PostList;
