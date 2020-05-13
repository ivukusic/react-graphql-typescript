import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import { QUERY_USERS, MUTATION_DELETE_USER } from './UserList.gql';
import Table from '../../../common/components/Table';
import { MenuContext } from '../../../App';
import { extractMessageFromError } from '../../../common/utils/Error';

const tableFields = [
  { name: 'id', label: 'ID' },
  { name: 'name', label: 'Name' },
  { name: 'email', label: 'Email' },
  { name: 'address', label: 'Address' },
  { name: 'role', label: 'Role' },
  { name: 'date', label: 'Date' },
];

export const UserList = ({ history }: { history: any }): JSX.Element => {
  const { togglePopup } = useContext(MenuContext);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data, refetch } = useQuery(QUERY_USERS, {
    variables: { first: itemsPerPage, skip: (currentPage - 1) * itemsPerPage },
  });
  const [deleteUser] = useMutation(MUTATION_DELETE_USER);

  useEffect(() => {
    if (history && history.location.state && history.location.state.refresh) {
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

  const onUserDelete = (id: number) => () => {
    togglePopup({
      cb: async (success: any, error: any) => {
        try {
          await deleteUser({ variables: { where: { id } } });
          refetch();
          success();
        } catch ({ graphQLErrors }) {
          let errorMessage = extractMessageFromError(graphQLErrors);
          error(errorMessage);
        }
      },
      title: 'Delete user',
      message: `Are you sure you want to delete user with id "${id}"?`,
    });
  };

  const transformData = (data: any) => {
    return data.map(({ node }: any) => ({
      ...node,
      name: `${node.firstName} ${node.lastName}`,
      address: `${node.address}, ${node.city} ${node.country}`,
      date: dayjs(node.createdAt).format('DD.MM.YYYY'),
    }));
  };

  const generateLink = (id: number) => {
    return `/user/${id}/edit`;
  };

  let edges = [];
  let pageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
  };
  let totalCount = 0;
  if (data && data.usersConnection && data.usersConnection.totalCount) {
    edges = data.usersConnection.edges;
    pageInfo = data.usersConnection.pageInfo;
    totalCount = data.usersConnection.totalCount;
  }
  return (
    <div>
      <Table
        currentPage={currentPage}
        data={transformData(edges)}
        error={(error && error.toString()) || ''}
        fields={tableFields}
        itemsPerPage={itemsPerPage}
        link={generateLink}
        loading={loading}
        name="Users"
        goToPage={goToPage}
        pageInfo={pageInfo}
        totalCount={totalCount}
        setItemsPerPage={setItems}
        onDelete={onUserDelete}
      />
    </div>
  );
};

export default withRouter(UserList);
