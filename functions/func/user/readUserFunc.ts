import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall  function for read user profile written by Jerry;
input:
    data = { uid }
output:
    userDoc.data(): promise<firebasefirestore.documentdata | undefined >
*/
export const readUser = async (data:{
  uid: string;
}) => {
  const { uid } = data;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid is not exist'));
  }
  const collection = 'user';
  const userRef = db.collection(collection).doc(uid);
  const userDoc = await userRef.get();
  return userDoc.data();
};

export default functions.https.onCall(readUser);
