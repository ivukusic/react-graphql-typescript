import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { AiOutlineUser } from 'react-icons/ai';
import { useQuery, useMutation } from 'react-apollo-hooks';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Card from '../../../common/components/Card';
import { QUERY_USER_PROFILE, MUTATION_CREATE_USER, MUTATION_UPDATE_USER } from './UserProfile.gql';
import { Validators } from '../../../common/utils/Validators';
import { checkValidity, validateForm } from '../../../common/utils/Validation';
import { updateLocalStateUser } from '../../../common/utils/LocalState';
import { INITIAL_TEXT_FIELD } from '../../../common/constants/CommonConstants';
import CreateEditProfile from '../../../common/components/CreateEditProfile';

import './UserProfile.style.scss';

const getInitialForm = (currentUser: any, edit?: boolean) => {
  const form: any = {
    company: {
      ...INITIAL_TEXT_FIELD,
      field: 'company',
      label: 'Company',
      disabled: true,
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: 'Nordit',
    },
    email: {
      ...INITIAL_TEXT_FIELD,
      disabled: currentUser.role !== 'ADMIN',
      field: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: [
        { check: Validators.required, message: 'Field required' },
        { check: Validators.email, message: 'Invalid email address' },
      ],
      value: edit ? currentUser.email : '',
    },
    firstName: {
      ...INITIAL_TEXT_FIELD,
      field: 'firstName',
      label: 'First name',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit ? currentUser.firstName : '',
    },
    lastName: {
      ...INITIAL_TEXT_FIELD,
      field: 'lastName',
      label: 'Last name',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit ? currentUser.lastName : '',
    },
    address: {
      ...INITIAL_TEXT_FIELD,
      field: 'address',
      label: 'Address',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit ? currentUser.address : '',
    },
    city: {
      ...INITIAL_TEXT_FIELD,
      field: 'city',
      label: 'City',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit ? currentUser.city : '',
    },
    country: {
      ...INITIAL_TEXT_FIELD,
      field: 'country',
      label: 'Country',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit ? currentUser.country : '',
    },
    postalCode: {
      ...INITIAL_TEXT_FIELD,
      field: 'postalCode',
      label: 'Postal code',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit ? currentUser.postalCode : '',
    },
    description: {
      ...INITIAL_TEXT_FIELD,
      field: 'description',
      label: 'Description',
      value: edit ? currentUser.description : '',
    },
  };
  if (!edit) {
    form['role'] = {
      ...INITIAL_TEXT_FIELD,
      data: ['ADMIN', 'EDITOR', 'USER'],
      field: 'role',
      label: 'Role',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: 'USER',
    };
    form['password'] = {
      ...INITIAL_TEXT_FIELD,
      field: 'password',
      label: 'Password',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: '',
    };
  }
  return form;
};

export const UserProfile = ({ history }: RouteComponentProps): JSX.Element => {
  const edit = history.location.pathname.includes('user-profile') || history.location.pathname.includes('user-edit');
  const userProfile = history.location.pathname.includes('user-profile');

  let { data } = useQuery<any>(QUERY_USER_PROFILE);
  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const [updateUser] = useMutation(MUTATION_UPDATE_USER);

  const currentUser = (data && data.currentUser) || {};

  const [form, setForm] = useState<Record<string, any>>(getInitialForm(currentUser, edit));
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

  const onSelect = (value: string) => {
    let error = form.role.error;
    if (error) {
      error = checkValidity(form.role.validators, value).error;
    }
    setForm({ ...form, role: { ...form.role, error, value } });
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
        let result: any;
        let type = 'createUser';
        if (edit) {
          type = 'updateUser';
          result = await updateUser({ variables: { data: dataToSend, where: { id: currentUser.id } } });
        } else {
          result = await createUser({ variables: { data: dataToSend } });
        }
        if (userProfile && result && result.data && result.data[type]) {
          await updateLocalStateUser(data.updateUser);
          setSuccessMessage('User successfully saved');
        } else {
          history.push('/user/list');
        }
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

  return (
    <Container fluid>
      <Row>
        {edit && (
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
        )}
        <Col lg={8} md={12}>
          <CreateEditProfile
            edit={edit}
            error={error}
            form={form}
            loading={loading}
            message={message}
            onChange={onChange}
            onSave={onSave}
            onSelect={onSelect}
            title={edit ? 'Edit profile' : 'Create profile'}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(UserProfile);
