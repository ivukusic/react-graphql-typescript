import React, { useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { resetLocalStateUser } from '../../utils/LocalState';
import MenuIcon from '../MenuIcon';
import Search from '../Search';

import './Header.style.scss';

interface Props extends RouteComponentProps {
  openSidebar: () => void;
  title: string;
  routes: any;
  user: any;
}

const Header = ({ history, openSidebar, routes, title }: Props): JSX.Element => {
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
    <div className="header d-flex flex-column flex-md-row align-items-md-center justify-content-between pl-4 pr-4">
      <div className="d-flex flex-row align-items-center mt-3 mt-md-0">
        <AiOutlineMenu className="sidebar-menu-icon" size={20} color="#323232" onClick={openSidebar} />
        <h4 className="mb-0">{t}</h4>
      </div>
      <div className="d-flex flex-row align-items-center mt-3 mt-md-0  mb-3 mb-md-0 ">
        <Search className="mr-3" onChangeText={onChangeText} value={searchText} />
        <MenuIcon logout={logout} />
      </div>
    </div>
  );
};

export default withRouter(Header);
