import * as functions from 'firebase-functions';
import { db } from '../../db';
import { getPostScore } from './getPostScoreFunc';
/*
Author @Stephennn
update the post score after being re-calculated.
call after every update async
Input {
    postId : the id of a post needed to be update
}
Output {
    promise<writeresult>
}
*/
export const updatePostScore = async (data: {
  postId: string;
}) => {
  const {
    postId,
  } = data;
  if (postId == null) {
    return Promise.reject(new Error('postId does not exist'));
  }
  const collection = 'post';
  const postRef = db.collection(collection).doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();
  if (postData === undefined) {
    return Promise.reject(new Error('postData does not exist'));
  }
  const postScore = await getPostScore({ postId });

  return postRef.update({ postScore });
}; // Admin SDK

export default functions.https.onCall(updatePostScore); // Allow users to get access to this function
