import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import ApolloWrapper from './core/Apollo';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PostList from './screens/Post/PostList';
import PostCreateEdit from './screens/Post/PostCreateEdit';
import UserList from './screens/User/UserList';
import UserCreateEdit from './screens/User/UserCreateEdit';
import UserProfile from './screens/User/UserProfile';

import routes from './core/Routes';
import Header from './common/components/Header';
import Sidebar from './common/components/Sidebar';
import { QUERY_CURRENT_USER } from './common/apollo/query/user';

export const MenuContext = React.createContext({ title: 'Dashboard', showSidebar: () => {} });

ApolloWrapper.initialize();

export default function App() {
  const [title, setTitle] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
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

  const setUser = (user: any) => {
    setCurrentUser(user);
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
        <MenuContext.Provider value={{ title, showSidebar }}>
          <Router>
            <div className="d-flex flex-row">
              {sidebarVisible && <Sidebar routes={ROUTES} updateTitle={updateTitle} />}
              <div className="container-fluid content p-0">
                {sidebarVisible && <Header title={title} user={currentUser} routes={ROUTES} />}

                <div className="p-4">
                  <Switch>
                    <Route path="/login">
                      <Login showSidebar={showSidebar} setUser={setUser} updateTitle={updateTitle} />
                    </Route>

                    <Route path="/post/post-create">
                      <PostCreateEdit />
                    </Route>
                    <Route path="/post">
                      <PostList />
                    </Route>

                    <Route path="/user/user-create">
                      <UserCreateEdit />
                    </Route>
                    <Route path="/user/user-profile">
                      <UserProfile />
                    </Route>
                    <Route path="/user">
                      <UserList />
                    </Route>
                    <Route path="/">
                      <Dashboard />
                    </Route>
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
        </MenuContext.Provider>
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
