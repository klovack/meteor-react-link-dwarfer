import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

SimpleSchema.defineValidationErrorTransform((error) => {
  const meteorError = new Meteor.Error(error.message);
  meteorError.errorList = error.details;
  return meteorError;
});
