/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';
// import { getPostScore } from './getPostScoreFunc';
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

  let tagScore = 0;
  const posts = await tagData.posts;

  return new Promise(async (resolve, reject) => {
    if (!posts) {
      reject(new Error('posts Read failed'));
    } else {
      for (const postId of posts) {
        const postRef = db.collection('post').doc(postId);
        const postDoc = await postRef.get();
        const postData = postDoc.data();
        if (!postData) {
          reject(new Error('postData Read failed'));
        } else {
          const postScore = await postData.postScore;
          tagScore += postScore;
        }
      }
      resolve(tagScore);
    }
  });
};

export default functions.https.onCall(getTagScore);
