import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author: @Carstin
return the score of this post
Input {
  postId: the postId of the post you want to get score of
}
Output {
  return the actual score of the post (does not include upload)
}
*/

export const getPostScore = async (data:{
  postId: string
}) => {
  const { postId } = data;
  const postRef = db.collection('post').doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();

  if (!postData) {
    return Promise.reject(new Error(`postData Read failed: at collection post with docID [${postId}].`));
  }
  const likeNum = postData.like;
  const { viewNum } = postData;
  const { commentNum } = postData;
  const share = postData.shareBy;
  let shareNum = 0;
  if (share !== undefined) { shareNum = share.length; }
  const save = postData.saveBy;
  let saveNum = 0;
  if (save !== undefined) { saveNum = save.length; }
  let postScore = 15 + likeNum + viewNum * 0.5 + commentNum * 3 + shareNum + saveNum;

  const currentTime = Math.floor(Date.now() / 1000);
  const lastEdited = postData.editTime;
  const timePasted = currentTime - lastEdited;
  if (timePasted < 0) {
    return Promise.reject(new Error('time is not valid, current time - last_edited time is less than 0'));
  } if (timePasted > 7776000) { // 90 days
    postScore *= 0.5;
  } else if (timePasted > 2592000) { // 30 days
    postScore *= 0.7;
  } else if (timePasted > 1296000) { // 15 days
    postScore *= 0.8;
  } else if (timePasted > 604800) { // 7 days
    postScore *= 0.95;
  } else if (timePasted < 86400) { // within 1 day
    postScore *= 1.1;
  }
  console.log(postScore);
  return postScore;
};
export default functions.https.onCall(getPostScore);
