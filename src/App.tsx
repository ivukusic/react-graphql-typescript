import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from './screens/Dashboard';
import PostList from './screens/Post/PostList';
import PostCreateEdit from './screens/Post/PostCreateEdit';

import UserList from './screens/User/UserList';
import UserCreateEdit from './screens/User/UserCreateEdit';
import UserProfile from './screens/User/UserProfile';

import routes from './core/Routes';
import Header from './common/components/Header';
import Sidebar from './common/components/Sidebar';

const MenuContext = React.createContext('dashboard');

export default function App() {
  const [title, setTitle] = useState('');

  const updateTitle = (title: string) => {
    setTitle(title);
  };

  return (
    <MenuContext.Provider value={'dashboard'}>
      <Router>
        <div className="d-flex flex-row">
          <Sidebar routes={routes} updateTitle={updateTitle} />
          <div className="container-fluid p-0">
            <Header title={title} />

            <div className="p-4">
              <Switch>
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
  );
}
