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

export const getPostScore = async(data:{
  postId: string
}) => {
  const { postId } = data;
  const postRef = db.collection('post').doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();

  return new Promise((resolve, reject) => {
    if (!postData) {
      reject(new Error(`postData Read failed: at collection post with docID [${postId}].`));
    } else {
      const like_num = postData.like;
      const view_num = postData.viewNum;
      const comment_num = postData.commentNum;
      const share = postData.shareBy;
      const share_num = share.length;
      const save = postData.saveBy;
      const save_num = save.length;
      var postScore = 15 + like_num + view_num * 0.5 + comment_num * 3 + share_num + save_num;

      const current_time = Math.floor(Date.now() / 1000);
      const last_edited = postData.editTime;
      const time_pasted = current_time - last_edited;
      if (time_pasted < 0) {
        reject(new Error(`time is not valid, current time - last_edited time is less than 0`));
      } else if (time_pasted > 7776000) {                   // 90 days
        postScore = postScore * 0.5;                        
      } else if (time_pasted > 2592000) {                   // 30 days
        postScore = postScore * 0.7;
      } else if (time_pasted > 1296000) {                   // 15 days
        postScore = postScore * 0.8;
      } else if (time_pasted > 604800) {                    // 7 days
        postScore = postScore * 0.95;
      } else if (time_pasted < 86400) {                     // within 1 day
        postScore = postScore * 1.1;
      }
      resolve(postScore);
    }
  });
}
export default functions.https.onCall(getPostScore);

