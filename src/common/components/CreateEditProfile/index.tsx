import React, { ChangeEvent } from 'react';
import { Container, Col, Row } from 'reactstrap';

import Card from '../Card';
import Button from '../Button';
import Dropdown from '../FormElements/Dropdown';
import TextField from '../FormElements/TextField';
import TextArea from '../FormElements/TextArea';

import './CreateEditProfile.style.scss';

interface Props {
  edit?: boolean;
  error?: string;
  form: Record<string, any>;
  loading?: boolean;
  message?: string;
  title: string;
  onChange: (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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
  const renderTextField = (field: string) => (
    <TextField
      disabled={form[field].disabled}
      error={form[field].error && form[field].error.error ? form[field].error.message : ''}
      field={form[field].field}
      label={form[field].label}
      required={form[field].required}
      onChange={onChange(field)}
      value={form[field].value}
    />
  );

  const renderTextArea = (field: string) => {
    return (
      <TextArea
        disabled={form[field].disabled}
        error={form[field].error && form[field].error.error ? form[field].error.message : ''}
        field={form[field].field}
        label={form[field].label}
        required={form[field].required}
        onChange={onChange(field)}
        value={form[field].value}
      />
    );
  };

  const renderDropdown = (field: string) => (
    <Dropdown
      disabled={form[field].disabled}
      error={form[field].error && form[field].error.error ? form[field].error.message : ''}
      field={form[field].field}
      label={form[field].label}
      required={form[field].required}
      data={['ADMIN', 'EDITOR', 'USER']}
      onSelect={onSelect}
      value={form[field].value}
    />
  );

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
        {!edit && <Row>{renderDropdown('role')}</Row>}
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
