import { UserRecord } from 'firebase-functions/lib/providers/auth';
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall  function for read user profile written by Jerry;
input:
    data:{
      uid: string;
      updateField: string;
      updateContext: any;
    }
output:
    promise<writeresult>
*/
export const deleteUser = async (user:UserRecord) => {
  const { uid } = user;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid is not exist'));
  }
  const collection = 'user';
  const userRef = db.collection(collection).doc(uid);
  return userRef.delete();
};

export default functions.auth.user().onDelete(deleteUser);
