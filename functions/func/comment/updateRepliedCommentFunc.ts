import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
author @Cath
Called when adding a comment that is replying to another comment.
A helper function for each comment to track its child comments
Input {
    commentId: the id of the parent comment being updated,
    toAddId: the id of the child comment to be tracked
}
Output {
    the child comment id should be added into the parent comment's repliedBy array
}
*/

export const updateRepliedComment = async (data: {
  commentId: string,
  toAddId: string,
}) => {
  const { commentId, toAddId } = data;
  const commentRef = db.collection('comment').doc(commentId);
  const commentDoc = await commentRef.get();
  if (commentDoc === undefined) {
    return Promise.reject(new Error('invalid update, cannot read parent comment.'));
  }
  const commentData = commentDoc.data();
  // @ts-ignore
  if (commentData.repliedBy.indexOf(toAddId) === -1) {
    // @ts-ignore
    commentData.repliedBy.push(toAddId);
    // @ts-ignore
    commentRef.update({ repliedBy: commentData.repliedBy });
  }
  return commentData;
};

export default functions.https.onCall(updateRepliedComment);
