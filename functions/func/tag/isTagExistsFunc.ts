import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author: @Carstin
check if the tag already exists , if so return true, otherwise it would return false
Input {
    name: tagName
}
Output {
    tagId of existing tag : exists
    null : not exists
}
*/

export const isTagExists = async (data:{
  name: string;
}) => {
  const collection = 'tag';
  const { name } = data;
  const tagRef = db.collection(collection);
  const snapshot = await tagRef.where('name', '==', name).get();
  if (snapshot.size === 1) {
    return snapshot.docs[0].id;
  }
  return null;
};

export default functions.https.onCall(isTagExists);
