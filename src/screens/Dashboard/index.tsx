import React from 'react';
import { useQuery } from 'react-apollo';

import { QUERY_CURRENT_USER } from 'common/apollo/query/user.gql';
import { UserCard } from 'common/components';

const Dashboard = () => {
  const { data } = useQuery(QUERY_CURRENT_USER);

  return (
    <div className="container-fluid flex-column align-items-center">
      <div className="col col-lg-4">{data && data.currentUser && <UserCard user={data.currentUser} />}</div>
    </div>
  );
};

export default Dashboard;
