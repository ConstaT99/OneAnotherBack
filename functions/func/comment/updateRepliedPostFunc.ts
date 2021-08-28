import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Cath
Called when adding a comment that is replying to another post.
A helper function for a post to track its child comments
Input {
    postId: the id of the parent post being updated,
    toAddId: the id of the child comment to be tracked
}
Output {
    the child comment id should be added into the parent post's repliedBy array
}
*/

export const updateRepliedPostFunc = async (data: {
  postId: string,
  toAddId: string,
}) => {
  const { postId, toAddId } = data;
  const postRef = db.collection('post').doc(postId);
  const postDoc = await postRef.get();
  if (postDoc === undefined) {
    return Promise.reject(new Error('invalid update, cannot read parent post.'));
  }
  const postData = postDoc.data();
  // @ts-ignore
  if (postData.comment.indexOf(toAddId) === -1) {
    // @ts-ignore
    postData.comment.push(toAddId);
    // @ts-ignore
    postData.commentNum++;
    // @ts-ignore
    postRef.update({ comment: postData.comment, commentNum: postData.commentNum });
  }
  return postData;
};

export default functions.https.onCall(updateRepliedPostFunc);
