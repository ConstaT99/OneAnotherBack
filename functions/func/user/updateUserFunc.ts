/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable no-unused-vars */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall function for update user profile written by Jerry;
input:
    data:{
      uid: string;
      updateField: string;
      updateContext: any;
    }
output:
    promise<writeresult>
*/
export const updateUser = async (data:{
  uid: string;
  updateField: string;
  updateContext: any;
}) => {
  const { uid, updateField, updateContext } = data;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid is not exist'));
  }
  if (updateField == null || updateContext == null) {
    return Promise.reject(new Error('update info is missing'));
  }
  const collection = 'user';
  const userRef = db.collection(collection).doc(uid);
  return userRef.update({ [updateField]: updateContext });
};

export default functions.https.onCall(updateUser);
