import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
  const onLogout = () => {
    Accounts.logout();
  };

  return (
    <div className="navigation">
      <h1>{ props.title }</h1>
      <button className="navigation--link" onClick={onLogout}>Logout</button>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PrivateHeader;
