// admin.initializeApp(functions.config().firebase);
// export const realtimeDb = admin.database();// This is realtimeDb
// import firebase from "firebase";
import * as admin from 'firebase-admin';

const ServiceAccount = require('../oneanother-757c7-firebase-adminsdk-hi63k-3d1dce4fbb.json');

const config = {
  credential: admin.credential.cert(ServiceAccount),
  databaseURL: 'https://oneanother-757c7-default-rtdb.firebaseio.com',
  storageBucket: 'oneanother-757c7.appspot.com',
  projectId: 'oneanother-757c7',
};
export const project = admin.initializeApp(config);
export const db = project.firestore();
export const storage = firebase.storage();
admin.auth();
