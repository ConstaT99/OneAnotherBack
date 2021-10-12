/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author: @Carstin
save a tag to user's savedTags array
Input {
  uid: user Id of the current user
  tagName: the name of the tag user wanted to save
}
Output {
  Proimise
}
*/

export const saveTag = async (data:{
  uid: string,
  tagName: string,
}) => {
  const { uid, tagName } = data;
  const userRef = db.collection('user').doc(uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  if (!userData) {
    return Promise.reject(new Error('userData does not exist'));
  }
  const currentArray = userData.savedTags;
  for (const items of currentArray) {
    const temp:string = items;
    if (temp === tagName) {
      return Promise.resolve('tag already been saved');
    }
  }

  await currentArray.push(tagName);
  return userRef.update({ savedTags: currentArray });
};

export default functions.https.onCall(saveTag);
