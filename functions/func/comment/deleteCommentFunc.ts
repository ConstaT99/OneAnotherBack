import * as functions from 'firebase-functions';
import { getComment } from './getCommentFunc';
import { db } from '../../db';

/*
Author @Cath Edited @Carstin
Given the docId, delete the corresponding comment.
input:
    data:{
      commentId: string;
    }
output:
    promise<writeresult>
*/

export const deleteComment = async (data:{ commentId: string }) => {
  const { commentId } = data;
  const commentExists = await getComment(commentId);
  if (!commentExists) {
    return Promise.reject(new Error('comment does not exist'));
  }
  if (commentExists.replyToPost === true) {
    const postId = commentExists.replyId;
    const postRef = db.collection('post').doc(postId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    if (!postData) {
      return Promise.reject(new Error('postData Read failed'));
    }
    const { comment, commentNum } = postData;
    await comment.forEach((element:string, index:number) => {
      if (element === commentId) comment.splice(index, 1);
    });
    const newNum = commentNum - 1;
    await postRef.update({ comment,commentNum: newNum });
  } else if (commentExists.replyToProductBuy === true) {
    const productId = commentExists.replyId;
    const productRef = db.collection('productBuy').doc(productId);
    const productDoc = await productRef.get();
    const productData = productDoc.data();
    if (!productData) {
      return Promise.reject(new Error('productData Read failed'));
    }
    const { comment, commentNum } = productData;
    await comment.forEach((element:string, index:number) => {
      if (element === commentId) comment.splice(index, 1);
    });
    const newNum = commentNum - 1;
    await productRef.update({ comment,commentNum: newNum });
  } else if (commentExists.replyToProductSell === true) {
    const productId = commentExists.replyId;
    const productRef = db.collection('productSell').doc(productId);
    const productDoc = await productRef.get();
    const productData = productDoc.data();
    if (!productData) {
      return Promise.reject(new Error('productData Read failed'));
    }
    const { comment, commentNum } = productData;
    await comment.forEach((element:string, index:number) => {
      if (element === commentId) comment.splice(index, 1);
    });
    const newNum = commentNum - 1;
    await productRef.update({ comment,commentNum: newNum });
  }
  const replyArray = commentExists.repliedBy;
  if (replyArray.length !== 0) {
    replyArray.forEach((element:string) => {
      deleteComment({ commentId: element }); // not sure it will work, if not use normal for loop
    });
  }

  const collection = 'comment';
  const commentRef = db.collection(collection).doc(commentId);
  return commentRef.delete();
};

export default functions.https.onCall(deleteComment);
