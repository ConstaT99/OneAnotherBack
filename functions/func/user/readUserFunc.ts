/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall  function for read user profile written by Jerry;
input:
    data = { uid }
output:
    promise snapshot

TODO:
    1. complete more safety check(for example:
        - user can only be check by loged in user
        - user can only be check by the user who are not in the black list)
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
  return new Promise((resolve, reject) => {
    const userData = userDoc.data();
    if (!userData) {
      reject(new Error('read user failed'));
    } else {
      resolve(userData);
    }
  });
};

export default functions.https.onCall(readUser);
