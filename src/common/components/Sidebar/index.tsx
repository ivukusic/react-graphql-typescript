import React, { useState, SyntheticEvent } from 'react';
import { AiOutlineBank, AiOutlineUser, AiOutlinePushpin } from 'react-icons/ai';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import './Sidebar.style.scss';

interface Props extends RouteComponentProps {
  routes: any;
  updateTitle: (title: string) => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'AiOutlineBank':
      return <AiOutlineBank size="20" />;
    case 'AiOutlineUser':
      return <AiOutlineUser size="20" />;
    case 'AiOutlinePushpin':
      return <AiOutlinePushpin size="20" />;
    default:
      return;
  }
};

const SidebarComponent = ({ history, routes, updateTitle }: Props): JSX.Element => {
  const [active, setActive] = useState(
    history.location.pathname === '/' ? routes[0].path : `/${history.location.pathname.split('/')[1]}`,
  );

  const setActiveRoute = (route: string, title: string) => (e: SyntheticEvent) => {
    e.stopPropagation();
    updateTitle(title);
    setActive(route);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <a href="https://nordit.co/" className="">
          <div className="logo-img" />
        </a>
        <a href="https://nordit.co/">NORDIT</a>
      </div>
      <div className="sidebar-wrapper">
        <nav>
          <ul>
            {routes.map((route: any) => (
              <li
                key={route.name}
                className={`menu-item${route.path === active ? ' active' : ''}${
                  route.menu ? ' menu-item-has-child' : ''
                }`}
                onClick={setActiveRoute(route.path, route.menu ? route.menu[0].name : route.name)}
              >
                <Link to={route.menu ? route.menu[0].path : route.path}>
                  {getIcon(route.icon)}
                  <p>{route.name}</p>
                </Link>

                {route.menu && (
                  <ul>
                    {route.menu.map((childRoute: any) => (
                      <li
                        key={childRoute.name}
                        className="`menu-item-child"
                        onClick={setActiveRoute(route.path, childRoute.name)}
                      >
                        <Link to={childRoute.path}>{childRoute.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default withRouter(SidebarComponent);
