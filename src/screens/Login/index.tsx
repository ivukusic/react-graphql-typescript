import React, { useState, ChangeEvent } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';

import Button from '../../common/components/Button';
import Card from '../../common/components/Card';
import TextField from '../../common/components/FormElements/TextField';
import logo from '../../resources/images/NORDIT - logo.png';

import './Login.style.scss';
import { MUTATION_LOGIN } from './Login.mutation';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import routes from '../../core/Routes';
import { createLocalStateUser } from '../../common/apollo/mutation/localState';

interface Props extends RouteComponentProps {
  showSidebar: () => void;
  updateTitle: (title: string) => void;
  setUser: (user: any) => void;
}

export const Login = ({ history, showSidebar, setUser, updateTitle }: Props): JSX.Element => {
  const ROUTES = routes('');

  const [form, setForm] = useState({ email: 'user@test.com', password: 'password' });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [login] = useMutation(MUTATION_LOGIN);

  const onLogoLoad = () => {
    setVisible(true);
  };

  const onChange = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const onLogin = async () => {
    setLoading(true);
    try {
      const { data }: any = await login({ variables: { data: form } });
      const user = { id: data.login.id, role: data.login.role, email: data.login.email };
      createLocalStateUser(user);
      showSidebar();
      history.replace('/dashboard');
      updateTitle(ROUTES[0].name);
      setUser(user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

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
          <TextField label="Email" field="email" onChange={onChange('email')} value={form.email} />
          <TextField
            label="Password"
            field="password"
            type="password"
            onChange={onChange('password')}
            value={form.password}
          />
          <div className="d-flex flex-column align-items-start justify-content-center">
            <Button label="Login" onClick={onLogin} loading={loading} />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default withRouter(Login);
