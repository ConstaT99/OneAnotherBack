import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author: @Carstin
Get direct comments of a post
Input {
  postId: the postId of the post you wanna find
  limit: the number of how many (maximum) comments you wanna get. (limit == 0 if there is no limitation)
}
Output {
  comments Data
}
*/
export const getDirectComment = async (data:{
  postId: string;
  limit: number;
}) => {
  const { postId, limit } = data;
  const collection = 'comment';
  const comRef = db.collection(collection);
  if (limit === 0) {
    const commentGet = await comRef.where('replyId', '==', postId).get();
    const commentsData = commentGet.docs.map((doc) => doc.data());
    return commentsData;
  }
  const commentGet = await comRef.where('replyId', '==', postId).limit(limit).get();
  const commentsData = commentGet.docs.map((doc) => doc.data());
  return commentsData;
};
export default functions.https.onCall(getDirectComment);
