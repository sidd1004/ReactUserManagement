import React, { Component } from 'react';
import Header from './header';
import { Route } from 'react-router-dom';

import SignIn from './auth/signin';
import SignOut from './auth/signout';
import SignUp from './auth/signup';
import Home from './home';

import RequireAuth from './auth/require_auth';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" render={() => <div>Welcome to the site</div>} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signout" component={SignOut} />
        <Route path="/home" component={RequireAuth(Home)} />
      </div>
    );
  }
}
