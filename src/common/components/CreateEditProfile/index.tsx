import React, { ChangeEvent } from 'react';
import { Container, Col, Row } from 'reactstrap';

import Card from '../Card';
import Button from '../Button';
import Dropdown from '../FormElements/Dropdown';
import TextField from '../FormElements/TextField';
import TextArea from '../FormElements/TextArea';

import './CreateEditProfile.style.scss';
import { UserProfileFormType, UserProfileFormKeysType } from '../../types';

interface Props {
  edit?: boolean;
  error?: string;
  form: UserProfileFormType;
  loading?: boolean;
  message?: string;
  title: string;
  onChange: (field: UserProfileFormKeysType) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSave: () => void;
  onSelect: (value: any) => void;
}

const CreateEditProfile = ({
  edit,
  error,
  form,
  message,
  loading,
  onChange,
  onSave,
  onSelect,
  title,
}: Props): JSX.Element => {
  const renderTextField = (field: UserProfileFormKeysType): JSX.Element | null => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <TextField
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        onChange={onChange(field)}
        value={formField.value}
      />
    );
  };

  const renderTextArea = (field: UserProfileFormKeysType) => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <TextArea
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        onChange={onChange(field)}
        value={formField.value}
      />
    );
  };

  const renderDropdown = (field: UserProfileFormKeysType) => {
    let formField = form && form[field];
    if (!formField) {
      return <div />;
    }
    return (
      <Dropdown
        disabled={formField.disabled}
        error={formField.error && formField.error.error ? formField.error.message : ''}
        field={formField.field}
        label={formField.label}
        required={formField.required}
        data={['ADMIN', 'EDITOR', 'USER']}
        onSelect={onSelect}
        value={formField.value}
      />
    );
  };

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
