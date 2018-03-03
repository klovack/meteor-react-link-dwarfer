import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

const Links = new Mongo.Collection('links');

export default Links;

if (Meteor.isServer) {
  Meteor.publish('linksPublication', function fetchLink() {
    return Links.find({ userId: this.userId });
  });
}

Meteor.methods({
  /*
    Insert links to the links list with the arguments of url and description
    It will throw an Meteor.Error exception if it's called without userId or
    with the userId that doesn't match with this.userId. It will also throw an
    Meteor.Error Exception if url and description are not valid
  */
  // eslint-disable-next-line
  'links.insert'(url, description) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url,
      },
      description: {
        type: String,
        optional: true,
      },
      userId: {
        type: String,
      },
    }).validate({ url, description, userId });

    Links.insert({
      _id: shortid.generate(),
      url,
      description,
      userId: this.userId,
      isVisible: true,
      visitedCount: 0,
      lastVisitedAt: null,
    });
  },

  /*
    Set the visibility of the link based on its id, by passing _id and isVisible
    as arguments. It will throw an Meteor.Error exception if the userId is empty
    or if userId doesn't match with this.userId. It will also throw an
    Meteor.Error Exception if _id and isVisible are not valid
  */
  // eslint-disable-next-line
  'links.setVisibility'(_id, isVisible) {
    const { userId } = this;
    if (!userId) {
      throw new Meteor.Error('not-authorized');
    }

    const schema = new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
      isVisible: {
        type: Boolean,
      },
    });

    schema.validate({ _id, isVisible });
    Links.update({ _id, userId }, { $set: { isVisible } });
  },

  /*
    Track the visit of each link.
    This method doesn't require
  */
  // eslint-disable-next-line
  'links.trackVisit'(_id) {
    const schema = new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    });

    schema.validate({ _id });

    Links.update({ _id }, {
      $inc: {
        visitedCount: 1,
      },
      $set: {
        lastVisitedAt: new Date().getTime(),
      },
    });
  },

  /*
    Delete the link. This method will throw a Meteor.Error exception
    if userId is not provided or being called with different userId
  */
  // eslint-disable-next-line
  'links.delete'(_id) {
    const { userId } = this;
    if (!userId && userId.equal(Links.findOne({ userId, _id }))) {
      throw new Meteor.Error('not-authorized');
    }

    const schema = new SimpleSchema({
      _id: {
        type: String,
        min: 1,
      },
    });

    schema.validate({ _id });

    Links.remove({ _id, userId });
  },
});
