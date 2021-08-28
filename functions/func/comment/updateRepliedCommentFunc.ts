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

export const updateRepliedCommentFunc = async (data: {
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
  const repliedBy = commentData.repliedBy;
  if (repliedBy.indexOf(toAddId) === -1) {
    repliedBy.push(toAddId);
    commentRef.update({ repliedBy });
  }
  return commentData;
};
