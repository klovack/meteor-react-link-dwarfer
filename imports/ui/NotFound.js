import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Are you drunk?</h1>
      <p>I can&apos;t seem to find the link you typed in</p>
      <Link className="button button--link" to="/">Go Home</Link>
    </div>
  </div>
);

export default NotFound;
