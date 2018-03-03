import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

/*
  Redirect user if he's currently not logged in
  So he always stays at publicRoute
*/
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (Meteor.userId() ? (
      <Redirect to="/links" />
    ) : (
      <Component {...props} />
    ))
    }
  />
);

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default PublicRoute;
