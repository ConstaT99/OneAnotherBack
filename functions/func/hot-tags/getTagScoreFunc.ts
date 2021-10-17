import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author: @ZhanJing @Carstin
return the current score of this tag
! TODO: the for loop needs to be upgraded. (Runtime improvement)
Input {
  tagId: The tagId of the tag which you want to check
}
Output {
  return the actual score of the tag (does not include upload)
}
*/

export const getTagScore = async (data:{
  tagId: string
}) => {
  const { tagId } = data;
  const tagRef = db.collection('tag').doc(tagId);
  const tagDoc = await tagRef.get();
  const tagData = tagDoc.data();

  if (!tagData) {
    return Promise.reject(new Error(`tagData Read failed: at collection post with tagId [${tagId}].`));
  }
  const nameOfTag = await tagData.name;
  console.log(nameOfTag);

  const postCollection = db.collection('post');
  const snapshot = await postCollection.where('tag', '==', nameOfTag).get();
  const arrayOfPost = snapshot.docs.map((doc) => doc.data());
  const sumOfScore = arrayOfPost.reduce((sum, current) => sum + current.postScore, 0);
  return sumOfScore;
};

export default functions.https.onCall(getTagScore);
