import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import Card from '../../../common/components/Card';
import Button from '../../../common/components/Button';
import { UserProfileFormType } from '../../../common/types';

import './CreateEditProfile.style.scss';

interface Props {
  edit?: boolean;
  error?: string;
  form: UserProfileFormType;
  loading?: boolean;
  message?: string;
  title: string;
  onSave: () => void;
  renderTextArea: any;
  renderTextField: any;
  renderDropdown: any;
}

const CreateEditProfile = ({
  edit,
  error,
  form,
  message,
  loading,
  onSave,
  renderTextArea,
  renderTextField,
  renderDropdown,
  title,
}: Props): JSX.Element => {
  return (
    <Card className="edit-profile">
      <h4>{title}</h4>
      <Container fluid>
        <Row>
          <Col className="edit-profile__col" lg={4}>
            {renderTextField('company')}
          </Col>
          <Col className="edit-profile__col">{renderTextField('email')}</Col>
          {!edit && <Col className="edit-profile__col">{renderTextField('password')}</Col>}
        </Row>
        <Row>
          <Col className="edit-profile__col">{renderTextField('firstName')}</Col>
          <Col className="edit-profile__col">{renderTextField('lastName')}</Col>
        </Row>
        <Row>
          <Col className="edit-profile__col">{renderTextField('address')}</Col>
        </Row>
        <Row>
          <Col className="edit-profile__col">{renderTextField('city')}</Col>
          <Col className="edit-profile__col">{renderTextField('country')}</Col>
          <Col className="edit-profile__col">{renderTextField('postalCode')}</Col>
        </Row>
        {form.role && <Row>{renderDropdown('role')}</Row>}
        <Row>
          <Col className="edit-profile__col">{renderTextArea('description')}</Col>
        </Row>
      </Container>
      {error && <div className="error-message mb-4">{error}</div>}
      {message && <div className="success-message mb-4">{message}</div>}
      <div>
        <Button label={edit ? 'Save' : 'Create'} loading={loading} onClick={onSave} />
      </div>
    </Card>
  );
};

CreateEditProfile.defaultProps = {
  edit: false,
  error: '',
  loading: false,
  message: '',
};

export default CreateEditProfile;
