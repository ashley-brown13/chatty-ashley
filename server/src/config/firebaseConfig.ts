import * as admin from 'firebase-admin';
const serviceAccountKey = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

export default admin;
