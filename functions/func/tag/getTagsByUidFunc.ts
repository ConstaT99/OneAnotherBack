import * as functions from 'firebase-functions';
import { db } from '../../db';
import { isUserExists } from '../common/isUserExists';
import { getTagById } from './getTagById';

/*
Author @Carstin
Get the tags in a users storeArray and return the corresponding data
Inputs {
    uid: string
}
Outputs {
    array of tag docs
}
*/

export const getTagsByUid = async (data:{
  uid:string
}) => {
  const { uid } = data;
  const check = await isUserExists({ uid });
  if (check === false) {
    return Promise.reject(new Error('user does not exits'));
  }
  const userRef = db.collection('user').doc(uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  // @ts-ignore
  const savedTagArray = userData.savedTags;
  const outArray = [];
  if (savedTagArray) {
    for (const i in savedTagArray) {
      const tagData = await getTagById({ tagId: i });
      outArray.push(tagData);
    }
  }
  return outArray;
};
export default functions.https.onCall(getTagsByUid);