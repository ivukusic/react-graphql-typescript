import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import MenuIcon from '../MenuIcon';
import Search from '../Search';

import './Header.style.scss';
import { resetLocalStateUser } from '../../apollo/mutation/localState';

interface Props extends RouteComponentProps {
  title: string;
  routes: any;
  user: any;
}

const Header = ({ history, routes, title }: Props): JSX.Element => {
  const [searchText, setSearchText] = useState('');

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  const logout = () => {
    resetLocalStateUser();
    history.replace('/login');
  };

  let t = title;
  if (!t) {
    const pathName = history.location.pathname;
    let r = {
      name: '',
    };
    routes.forEach((route: any) => {
      if (route.menu) {
        if (route.path === pathName) {
          r = route;
        }
        route.menu.forEach((child: any) => {
          if (child.path === pathName) {
            r = child;
          }
        });
      }
    });
    if (r) {
      t = r.name;
    }
  }
  return (
    <div className="header d-flex flex-row align-items-center justify-content-between pl-4 pr-4">
      <h4>{t}</h4>
      <div className="d-flex flex-row align-items-center">
        <Search className="mr-3" onChangeText={onChangeText} value={searchText} />
        <MenuIcon logout={logout} />
      </div>
    </div>
  );
};

export default withRouter(Header);
