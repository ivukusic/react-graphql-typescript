import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import MenuIcon from '../MenuIcon';
import Search from '../Search';

import './Header.style.scss';
import routes from '../../../core/Routes';

interface Props extends RouteComponentProps {
  title: string;
}

const Header = ({ history, title }: Props): JSX.Element => {
  const [searchText, setSearchText] = useState('');

  const onChangeText = (text: string) => {
    setSearchText(text);
  };

  let t = title;
  if (!t) {
    const pathName = history.location.pathname;
    let r = {
      name: '',
    };
    routes.forEach(route => {
      if (route.menu) {
        if (route.path === pathName) {
          r = route;
        }
        route.menu.forEach(child => {
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
        <MenuIcon />
      </div>
    </div>
  );
};

export default withRouter(Header);
