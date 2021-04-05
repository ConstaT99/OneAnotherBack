// admin.initializeApp(functions.config().firebase);
// export const realtimeDb = admin.database();// This is realtimeDb
import * as admin from 'firebase-admin';
// import firebase from "firebase";
const ServiceAccount = require('../oneanother-757c7-firebase-adminsdk-hi63k-ac4e310940.json');

const config = {
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: 'https://oneanother-757c7-default-rtdb.firebaseio.com',
  storageBucket: 'oneanother-757c7.appspot.com',
  projectId: 'oneanother-757c7',
};
export const project = admin.initializeApp(config);
export const db = project.firestore();
admin.auth();
