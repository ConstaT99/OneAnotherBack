/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';

export const removeSavedTag = async (data:{
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
  let checkIn = false;
  const currentArray = userData.savedTags;
  for (const items of currentArray) {
    const temp:string = items;
    if (temp === tagName) {
      checkIn = true;
    }
  }
  if (checkIn === false) {
    return Promise.resolve('tag has already been deleted in the user profile');
  }
  await currentArray.forEach((element:string, index:number) => {
    if (element === tagName) currentArray.splice(index, 1);
  });

  return userRef.update({ savedTags: currentArray });
};
export default functions.https.onCall(removeSavedTag);
