import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';
import PublicRoute from '../routes/PublicRoute';
import PrivateRoute from '../routes/PrivateRoute';

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

// Notify whether user is logged in or not
export const onAuthChange = (isAuthenticated, browserHistory) => {
  const { pathname } = browserHistory.location;
  const isOnUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isOnAuthenticatedPage = authenticatedPages.includes(pathname);

  // Redirect user based on whether he logged in or out
  if (isOnUnauthenticatedPage && isAuthenticated) {
    browserHistory.replace('/links');
  } else if (isOnAuthenticatedPage && !isAuthenticated) {
    browserHistory.replace('/');
  }
};

export const createRoutes = browserHistory => (
  <Router history={browserHistory}>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute path="/signup" component={Signup} />
      <PrivateRoute path="/links" component={Link} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
