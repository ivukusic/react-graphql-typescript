import { useQuery } from '@apollo/react-hooks';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { withRouter } from 'react-router-dom';

import { MenuContext } from '../../../App';
import Table from '../../../common/components/Table';
import { INITIAL_TEXT_FIELD } from '../../../common/constants/CommonConstants';
import { FormInputType, PostEdgesType } from '../../../common/types';
import { extractMessageFromError } from '../../../common/utils/Error';

import { MUTATION_DELETE_POST, QUERY_POSTS } from './PostList.gql';

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
  const [users, setUsers] = useState<any[]>([]);
  const { loading, error, data, refetch } = useQuery(QUERY_POSTS, {
    variables: {
      first: itemsPerPage,
      skip: (currentPage - 1) * itemsPerPage,
      where: users && users.length ? { author: { id_in: users } } : null,
    },
  });
  const [deleteUser] = useMutation(MUTATION_DELETE_POST);

  useEffect(() => {
    if (history.location.state && history.location.state.refresh) {
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

  const transformData = (data: PostEdgesType[]): PostEdgesType[] =>
    data.map(({ node }: any) => ({
      ...node,
      author: `${node.author.firstName} ${node.author.lastName}`,
      date: dayjs(node.createdAt).format('DD.MM.YYYY'),
      published: node.published ? 'Yes' : 'No',
      comments: node.commentsConnection.totalCount || '-',
    }));

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

  const getFilters = (): any => ({
    user: {
      ...INITIAL_TEXT_FIELD,
      data: data && data.users ? data.users : [],
      field: 'user',
      label: 'User',
      required: false,
      value: '',
      className: 'filter',
      keys: [{ display: 'firstName', separator: ' ' }, { display: 'lastName' }],
      idKey: 'id',
    },
  });

  const onFilterChange = ({ form }: { form: { user: FormInputType } }) => {
    let newUsers: number[] = [];
    if (form.user.value && form.user.value.id && !users.includes(form.user.value.id)) {
      newUsers = [form.user.value.id];
    }
    setUsers(newUsers);
  };

  const generateLink = (id: number) => {
    return `/post/${id}/edit`;
  };

  let edges = [];
  let pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
  };
  let totalCount = 0;
  if (data && data.postsConnection && data.postsConnection.totalCount) {
    edges = data.postsConnection.edges;
    pageInfo = data.postsConnection.pageInfo;
    totalCount = data.postsConnection.totalCount;
  }
  return (
    <div>
      <Table
        currentPage={currentPage}
        data={transformData(edges)}
        error={(error && error.toString()) || ''}
        fields={tableFields}
        filters={getFilters()}
        itemsPerPage={itemsPerPage}
        link={generateLink}
        loading={loading}
        name="Posts"
        goToPage={goToPage}
        onDelete={onDelete}
        pageInfo={pageInfo}
        totalCount={totalCount}
        setItemsPerPage={setItems}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default withRouter(PostList);
