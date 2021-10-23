import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author @Carstin
Search tags by tagName
Input {
    input: tag Name you wanna find
    preTagId: the tagId of the last tag in previous call
    empty for first time calling this func.
}
Output {
   tagData: the array of tags matched with the key word
}
*/
export const searchTag = async (data:{
  input:string;
  preTagId:string;
}) => {
  const { input, preTagId } = data;
  const collection = 'tag';
  const tagRef = db.collection(collection);
  let tagGet;
  if (preTagId === '') {
    tagGet = await tagRef.where('name', '>=', input).where('name', '<=', `${input}\uf8ff`).limit(15).get();
    const tagData = tagGet.docs.map((doc) => doc.data());
    return tagData;
  }
  const preTagRef = db.collection(collection).doc(preTagId);
  const preTagDoc = await preTagRef.get();
  const preTagData = preTagDoc.data();
  if (!preTagData) {
    return Promise.reject(new Error('tagData could not be reached'));
  }
  tagGet = await tagRef.where('name', '>=', input).where('name', '<=', `${input}\uf8ff`)
    .startAfter(preTagDoc).limit(15)
    .get();
  const tagData = tagGet.docs.map((doc) => doc.data());
  return tagData;
};
export default functions.https.onCall(searchTag);
