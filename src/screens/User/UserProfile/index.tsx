import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { useParams, withRouter } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

import { useForm } from '../../../common/components/FormElements/Form.hook';
import UserCard from '../../../common/components/UserCard';
import { INITIAL_TEXT_FIELD } from '../../../common/constants/CommonConstants';
import { UserProfileFormKeysType, UserProfileFormType, UserType } from '../../../common/types';
import { extractMessageFromError } from '../../../common/utils/Error';
import { updateLocalStateUser } from '../../../common/utils/LocalState';
import { validateForm } from '../../../common/utils/Validation';
import { Validators } from '../../../common/utils/Validators';
import CreateEditProfile from '../CreateEditProfile';
import { MUTATION_CREATE_USER, MUTATION_UPDATE_USER, QUERY_USER, QUERY_USER_PROFILE } from './UserProfile.gql';

const getInitialForm = (user: UserType | null, currentUser: UserType, edit?: boolean): UserProfileFormType => {
  const form: UserProfileFormType = {
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
      disabled: !currentUser || currentUser.role !== 'ADMIN',
      field: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: [
        { check: Validators.required, message: 'Field required' },
        { check: Validators.email, message: 'Invalid email address' },
      ],
      value: edit && user && user.email ? user.email : '',
    },
    firstName: {
      ...INITIAL_TEXT_FIELD,
      field: 'firstName',
      label: 'First name',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit && user && user.firstName ? user.firstName : '',
    },
    lastName: {
      ...INITIAL_TEXT_FIELD,
      field: 'lastName',
      label: 'Last name',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit && user && user.lastName ? user.lastName : '',
    },
    address: {
      ...INITIAL_TEXT_FIELD,
      field: 'address',
      label: 'Address',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit && user && user.address ? user.address : '',
    },
    city: {
      ...INITIAL_TEXT_FIELD,
      field: 'city',
      label: 'City',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit && user && user.city ? user.city : '',
    },
    country: {
      ...INITIAL_TEXT_FIELD,
      field: 'country',
      label: 'Country',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit && user && user.country ? user.country : '',
    },
    postalCode: {
      ...INITIAL_TEXT_FIELD,
      field: 'postalCode',
      label: 'Postal code',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: edit && user && user.postalCode ? user.postalCode : '',
    },
    description: {
      ...INITIAL_TEXT_FIELD,
      field: 'description',
      label: 'Description',
      value: edit && user && user.description && user.description ? user.description : '',
    },
  };
  if (!edit || currentUser.role === 'ADMIN') {
    form.role = {
      ...INITIAL_TEXT_FIELD,
      data: [{ role: 'ADMIN' }, { role: 'EDITOR' }, { role: 'USER' }],
      // data: []
      field: 'role',
      label: 'Role',
      keys: [{ display: 'role' }],
      idKey: 'role',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: user && user.role ? { role: user.role } : { role: 'USER' },
    };
    if (!edit) {
      form.password = {
        ...INITIAL_TEXT_FIELD,
        field: 'password',
        label: 'Password',
        required: true,
        validators: [{ check: Validators.required, message: 'Field required' }],
        value: '',
      };
    }
  }
  return form;
};

export const UserProfile = ({ history }: { history: any }): JSX.Element => {
  const { id } = useParams();

  const edit = history.location.pathname.includes('user-profile') || !!id;
  const userProfile = history.location.pathname.includes('user-profile');

  const { data: currentUserData } = useQuery<any>(QUERY_USER_PROFILE);
  let queryId = id ? parseInt(id, 10) : 0;
  if (userProfile) {
    queryId = currentUserData.currentUser.id;
  }
  const { data: newData } = useQuery<any>(QUERY_USER, { variables: { where: { id: queryId } } });
  const user = (newData && newData.user) || {};

  const [createUser] = useMutation(MUTATION_CREATE_USER);
  const [updateUser] = useMutation(MUTATION_UPDATE_USER);

  const [formLoaded, setFormLoaded] = useState(false);
  const [initialForm, setInitialForm] = useState<UserProfileFormType>(
    getInitialForm(null, currentUserData.currentUser, edit),
  );
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const formData = useForm(initialForm);
  const { form, setForm } = formData;

  useEffect(() => {
    if (user && user.id && !formLoaded) {
      setInitialForm(getInitialForm(user, currentUserData.currentUser, edit));
      setFormLoaded(true);
    }
  }, [user, currentUserData.currentUser, edit, formLoaded]);

  const onSave = async () => {
    const valid = validateForm(Object.keys(form), form);
    if (!valid.isValid) {
      setForm(valid.newState);
    } else {
      setLoading(true);
      try {
        const arrayOfKeys: any = Object.keys(form);
        const dataToSend: any = {};
        arrayOfKeys.forEach((key: UserProfileFormKeysType) => {
          const formField = form && form[key];
          if (formField) {
            if (formField.idKey) {
              dataToSend[key] = formField.value[formField.idKey];
            } else {
              dataToSend[key] = formField.value;
            }
          }
        });
        let result: any;
        let type = 'createUser';
        if (edit) {
          type = 'updateUser';
          result = await updateUser({ variables: { data: dataToSend, where: { id: user.id } } });
        } else {
          result = await createUser({ variables: { data: dataToSend } });
        }
        if (userProfile && result && result.data && result.data[type]) {
          await updateLocalStateUser(result.data.updateUser);
          setSuccessMessage('User successfully saved');
        } else {
          history.push({ pathname: '/user', state: { refresh: true } });
        }
      } catch ({ graphQLErrors }) {
        setErrorMessage(extractMessageFromError(graphQLErrors));
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
        {userProfile && (
          <Col lg={4} md={8}>
            <UserCard user={currentUserData.currentUser} />
          </Col>
        )}
        {form && !!Object.keys(form).length && (
          <Col lg={8} md={12}>
            <CreateEditProfile
              {...formData}
              edit={edit}
              error={error}
              loading={loading}
              message={message}
              onSave={onSave}
              title={edit ? 'Edit profile' : 'Create profile'}
            />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default withRouter(UserProfile);
