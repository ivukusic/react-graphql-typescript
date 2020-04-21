import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AiOutlineUser } from 'react-icons/ai';

import Card from '../../../common/components/Card';
import TextField from '../../../common/components/FormElements/TextField';

import './UserProfile.style.scss';
import Button from '../../../common/components/Button';
import TextArea from '../../../common/components/FormElements/TextArea';
import { QUERY_USER_PROFILE, MUTATION_UPDATE_USER } from './UserProfile.gql';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { Validators } from '../../../common/utils/Validators';
import { checkValidity, validateForm } from '../../../common/utils/Validation';
import { updateLocalStateUser } from '../../../common/utils/LocalState';
import { INITIAL_TEXT_FIELD } from '../../../common/constants/CommonConstants';

export const UserProfile = (): JSX.Element => {
  let { data } = useQuery<any>(QUERY_USER_PROFILE);
  const [updateUser] = useMutation(MUTATION_UPDATE_USER);

  const currentUser = (data && data.currentUser) || {};

  const [form, setForm] = useState<Record<string, any>>({
    company: {
      ...INITIAL_TEXT_FIELD,
      field: 'company',
      label: 'Company',
      disabled: true,
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.company,
    },
    email: {
      ...INITIAL_TEXT_FIELD,
      disabled: currentUser.role !== 'ADMIN',
      field: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.email,
    },
    firstName: {
      ...INITIAL_TEXT_FIELD,
      field: 'firstName',
      label: 'First name',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.firstName,
    },
    lastName: {
      ...INITIAL_TEXT_FIELD,
      field: 'lastName',
      label: 'Last name',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.lastName,
    },
    address: {
      ...INITIAL_TEXT_FIELD,
      field: 'address',
      label: 'Address',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.address,
    },
    city: {
      ...INITIAL_TEXT_FIELD,
      field: 'city',
      label: 'City',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.city,
    },
    country: {
      ...INITIAL_TEXT_FIELD,
      field: 'country',
      label: 'Country',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.country,
    },
    postalCode: {
      ...INITIAL_TEXT_FIELD,
      field: 'postalCode',
      label: 'Postal code',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: currentUser.postalCode,
    },
    description: {
      ...INITIAL_TEXT_FIELD,
      field: 'description',
      label: 'Description',
      value: currentUser.description,
    },
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let error = form[field].error;
    if (error) {
      error = checkValidity(form[field].validators, e.target.value).error;
    }
    setForm({ ...form, [field]: { ...form[field], error, value: e.target.value } });
  };

  const onSave = async () => {
    const valid = validateForm(Object.keys(form), form);
    if (!valid.isValid) {
      setForm(valid.newState);
    } else {
      setLoading(true);
      try {
        const dataToSend: Record<string, string> = {};
        Object.keys(form).forEach(key => {
          dataToSend[key] = form[key].value;
        });
        const { data }: any = await updateUser({ variables: { data: dataToSend, where: { id: currentUser.id } } });
        if (data && data.updateUser) {
          await updateLocalStateUser(data.updateUser);
        }
        setSuccessMessage('User successfully saved');
      } catch ({ graphQLErrors }) {
        if (graphQLErrors && graphQLErrors[0] && graphQLErrors[0].message) {
          setErrorMessage(graphQLErrors[0].message);
        } else {
          setErrorMessage("Something went wrong. Maybe it's your internet connection");
        }
      }
      setLoading(false);
    }
  };

  const setErrorMessage = (message: string) => {
    setError(message);
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const setSuccessMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

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

  const renderTextArea = (field: string) => (
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

  return (
    <Container fluid>
      <Row>
        <Col lg={4} md={8}>
          <Card className="user-profile mb-4">
            <div className="user-profile__header"></div>
            <div className="user-profile__image">
              <AiOutlineUser size={40} color="darkgray" />
            </div>
            <div className="user-profile__content">
              <h3>Ivan Vukušić</h3>
              {currentUser.description && <p className="quote">"{currentUser.description}"</p>}
            </div>
          </Card>
        </Col>
        <Col lg={8} md={12}>
          <Card className="edit-profile">
            <h4>Edit profile</h4>
            <Container fluid>
              <Row>
                <Col className="edit-profile__col" lg={4}>
                  {renderTextField('company')}
                </Col>
                <Col className="edit-profile__col">{renderTextField('email')}</Col>
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
              <Row>
                <Col className="edit-profile__col">{renderTextArea('description')}</Col>
              </Row>
            </Container>
            {error && <div className="error-message mb-4">{error}</div>}
            {message && <div className="success-message mb-4">{message}</div>}
            <div>
              <Button label="Save" loading={loading} onClick={onSave} />
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
