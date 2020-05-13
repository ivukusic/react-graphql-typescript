import React from 'react';
import UserCard from '../../common/components/UserCard';
import { useQuery } from 'react-apollo';
import { QUERY_CURRENT_USER } from '../../common/apollo/query/user.gql';
import { Container, Col } from 'reactstrap';

const Dashboard = () => {
  const { data } = useQuery(QUERY_CURRENT_USER);

  return (
    <Container fluid className="flex-column align-items-center">
      <Col sm={4}>
        <UserCard user={data.currentUser} />
      </Col>
    </Container>
  );
};

export default Dashboard;
