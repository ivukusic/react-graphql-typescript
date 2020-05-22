import React, { useEffect, useState } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { QUERY_CURRENT_USER } from 'common/apollo/query/user.gql';
import { Header, Popup, Sidebar } from 'common/components';
import { PopupType, UserType } from 'common/types';
import ApolloWrapper from 'core/Apollo';
import routes from 'core/Routes';
import Dashboard from 'screens/Dashboard';
import Login from 'screens/Login';
import PostCreateEdit from 'screens/Post/PostCreateEdit';
import PostList from 'screens/Post/PostList';
import UserList from 'screens/User/UserList';
import UserProfile from 'screens/User/UserProfile';

export const MenuContext = React.createContext<any>({
  title: 'Dashboard',
  showSidebar: () => {},
  popup: {
    cb: null,
    message: '',
    title: '',
    visible: false,
  },
  togglePopup: () => {},
});

ApolloWrapper.initialize();

export default function App() {
  const [title, setTitle] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [popup, setPopup] = useState<PopupType>({ cb: null, message: '', title: '', visible: false });
  const [currentUser, setCurrentUser] = useState<any>({});

  useEffect(() => {
    const checkLogin = async () => {
      const { data } = await ApolloWrapper.client.query({ query: QUERY_CURRENT_USER });
      if (data && data.currentUser && data.currentUser.id) {
        if (window.location.pathname === '/' || window.location.pathname === '/login') {
          window.location.href = 'http://localhost:3000/dashboard';
        }
        setCurrentUser(data.currentUser);
        setTitle('Dashboard');
        setSidebarVisible(true);
      } else {
        setTitle('Login');
        if (window.location.pathname !== '/login') {
          window.location.href = 'http://localhost:3000/login';
        }
      }
    };
    checkLogin();
  }, []);

  const updateTitle = (title: string) => {
    setTitle(title);
  };

  const setUser = (user: UserType) => {
    setCurrentUser(user);
  };

  const togglePopup = ({ cb, message, title }: PopupType) => {
    setPopup({ cb, message, title, visible: !popup.visible });
  };

  const openSidebar = () => {
    setSidebarOpened(!sidebarOpened);
  };

  const showSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (!title) {
    return null;
  }
  const ROUTES = routes(currentUser.role);
  return (
    <ApolloProvider client={ApolloWrapper.client}>
      <ApolloHooksProvider client={ApolloWrapper.client}>
        <MenuContext.Provider value={{ title, showSidebar, popup, togglePopup }}>
          <Router>
            <div className="d-flex flex-row">
              {sidebarVisible && <Sidebar opened={sidebarOpened} routes={ROUTES} updateTitle={updateTitle} />}
              <div className={`container-fluid content p-0 ${sidebarOpened ? ' content-opened' : ''}`}>
                {sidebarVisible && (
                  <Header title={title} user={currentUser} routes={ROUTES} openSidebar={openSidebar} />
                )}

                <div className="p-4">
                  <Switch>
                    <Route path="/login">
                      <Login showSidebar={showSidebar} setUser={setUser} updateTitle={updateTitle} />
                    </Route>

                    <Route path="/post/:id/edit/">
                      <PostCreateEdit />
                    </Route>
                    <Route path="/post/create">
                      <PostCreateEdit />
                    </Route>
                    <Route path="/post">
                      <PostList />
                    </Route>

                    <Route path="/user/create">
                      <UserProfile key="user-create" />
                    </Route>
                    <Route path="/user/:id/edit">
                      <UserProfile key="user-edit" />
                    </Route>
                    <Route path="/user-profile">
                      <UserProfile key="user-profile" />
                    </Route>
                    <Route path="/user">
                      <UserList />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/">
                      <Dashboard />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
            <Popup togglePopup={togglePopup} popup={popup} />
          </Router>
        </MenuContext.Provider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
