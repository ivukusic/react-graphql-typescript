import React from 'react';
import { useQuery } from 'react-apollo';
import { Col, Container } from 'reactstrap';

import { QUERY_CURRENT_USER } from '../../common/apollo/query/user.gql';
import UserCard from '../../common/components/UserCard';

const Dashboard = () => {
  const { data } = useQuery(QUERY_CURRENT_USER);

  return (
    <Container fluid className="flex-column align-items-center">
      <Col sm={4}>{data && data.currentUser && <UserCard user={data.currentUser} />}</Col>
    </Container>
  );
};

export default Dashboard;
