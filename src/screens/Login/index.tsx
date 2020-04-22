import React, { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';

import Button from '../../common/components/Button';
import Card from '../../common/components/Card';
import TextField from '../../common/components/FormElements/TextField';
import logo from '../../resources/images/NORDIT - logo.png';

import './Login.style.scss';
import { MUTATION_LOGIN } from './Login.gql';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import routes from '../../core/Routes';
import { createLocalStateUser } from '../../common/utils/LocalState';
import { INITIAL_TEXT_FIELD } from '../../common/constants/CommonConstants';
import { Validators } from '../../common/utils/Validators';
import { validateForm, checkValidity } from '../../common/utils/Validation';
import { UserType } from '../../common/types';

interface Props extends RouteComponentProps {
  showSidebar: () => void;
  updateTitle: (title: string) => void;
  setUser: (user: UserType) => void;
}

export const Login = ({ history, showSidebar, setUser, updateTitle }: Props): JSX.Element => {
  const ROUTES = routes('');

  const [error, setError] = useState('');
  const [form, setForm] = useState<Record<string, any>>({
    email: {
      ...INITIAL_TEXT_FIELD,
      field: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      validators: [
        { check: Validators.required, message: 'Field required' },
        { check: Validators.email, message: 'Invalid email address' },
      ],
      value: 'info@nordit.co',
    },
    password: {
      ...INITIAL_TEXT_FIELD,
      field: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      validators: [{ check: Validators.required, message: 'Field required' }],
      value: 'password',
    },
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [login] = useMutation(MUTATION_LOGIN);

  const onLogoLoad = () => {
    setVisible(true);
  };

  const onChange = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let error = form[field].error;
    if (error) {
      error = checkValidity(form[field].validators, e.target.value).error;
    }
    setForm({ ...form, [field]: { ...form[field], error, value: e.target.value } });
  };

  const onLogin = async () => {
    const valid = validateForm(Object.keys(form), form);
    if (!valid.isValid) {
      setForm(valid.newState);
    } else {
      setLoading(true);
      try {
        const { data }: any = await login({
          variables: { data: { email: form.email.value, password: form.password.value } },
        });
        const user = { ...data.login };
        delete user.jwt;
        createLocalStateUser(user, data.login.jwt);
        showSidebar();
        history.replace('/dashboard');
        updateTitle(ROUTES[0].name);
        setUser(user);
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

  const renderTextField = (field: string) => (
    <TextField
      disabled={form[field].disabled}
      error={form[field].error && form[field].error.error ? form[field].error.message : ''}
      field={form[field].field}
      type={form[field].type}
      label={form[field].label}
      required={form[field].required}
      onChange={onChange(field)}
      value={form[field].value}
    />
  );

  return (
    <div
      className={`login d-flex flex-column align-items-center justify-content-center h-100${visible ? ' visible' : ''}`}
    >
      <Card className="login__form d-flex flex-column flex-md-row justify-content-start">
        <div className="login__left d-flex flex-column justify-content-start align-items-center">
          <a href="https://nordit.co/" target="_blank" rel="noopener noreferrer">
            <img className="login__logo" src={logo} alt="NORDIT" onLoad={onLogoLoad} />
          </a>

          <div className="social-login d-flex flex-row align-items-end">
            Login with:
            <div className="social-icon social-icon--facebook ml-2">
              <FaFacebookF size={14} />
            </div>
            <div className="social-icon social-icon--twitter">
              <FaGoogle size={14} />
            </div>
            <div className="social-icon social-icon--google">
              <FaTwitter size={14} />
            </div>
          </div>
        </div>
        <div className="login__right d-flex flex-column w-100">
          <h4>login</h4>
          {renderTextField('email')}
          {renderTextField('password')}
          {error && <div className="error-message mb-4">{error}</div>}
          <div className="d-flex flex-column align-items-start justify-content-center">
            <Button label="Login" onClick={onLogin} loading={loading} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(Login);
