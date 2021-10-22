import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author: @Carstin
get sub comments of a comment
Input {
  commentId: the Comment Id of the parent comment
}
Output {
  child comment data
}
*/
export const getSubComment = async (data:{
  commentId: string;
}) => {
  const { commentId } = data;
  const collection = 'comment';
  const comRef = db.collection(collection);
  const commentGet = await comRef.where('replyId', '==', commentId).get();
  const commentsData = commentGet.docs.map((doc) => doc.data());
  return commentsData;
};
export default functions.https.onCall(getSubComment);
