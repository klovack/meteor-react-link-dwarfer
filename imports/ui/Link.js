import React from 'react';

import LinksList from './LinksList';
import AddLink from './AddLink';
import PrivateHeader from './PrivateHeader';

export default function () {
  return (
    <div>
      <PrivateHeader title="Your dwarved links" />
      <div className="page-content">
        <AddLink />
        <LinksList />
      </div>
    </div>
  );
}
