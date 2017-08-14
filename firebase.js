// @flow
const firebase = require('firebase');
const credentials = require('./credentials/client');

const init = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(credentials);
  }
};

init();

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
// $FlowFixMe
export const storage = firebase.storage ? firebase.storage() : null;
// eslint-disable-next-line new-cap
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
