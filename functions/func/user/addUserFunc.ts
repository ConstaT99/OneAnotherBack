/*
import * as functions from 'firebase-functions';
import { db } from '../../db';

A scratch function that adds user to cloud storage
Inputs: {
}
Written by Jerry
export const addUser = async (data:{
    userInfo: object;
})=> {
    { userInfo } = data;
}
 */

import * as functions from 'firebase-functions';
import { db } from '../../db';

export const addUser = async (data:{
  uid: string;
  other: Array<number>;
}) => {
  const collection = 'user';
  const userRef = db.collection(collection);
  if (userRef.add(data)) {
    return true;
  }
  return false;
};

export default functions.https.onCall(addUser);
