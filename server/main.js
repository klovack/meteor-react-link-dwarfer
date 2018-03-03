import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/startup/simple-schema-config';
import '../imports/api/users';
import Links from '../imports/api/links';

Meteor.startup(() => {
  /*
    This middleware is responsible to find link in the database
    based on the parameter as the id of the link.
    If the link exists, redirect to that link, otherwise
    send not found page.
   */
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });

    if (link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
  });
});
