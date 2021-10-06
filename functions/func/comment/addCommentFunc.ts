import * as functions from 'firebase-functions';
import { db } from '../../db';
import { updateRepliedComment } from './updateRepliedCommentFunc';
import { updateRepliedPost } from './updateRepliedPostFunc';
import { updateRepliedProductBuy } from './updateRepliedProductBuyFunc';
import { updateRepliedProductSell } from './updateRepliedProductSellFunc';

/*
Author @Cath Edited @Carstin
Input {
    author: the userId of user who composed the comment
    content: the content of the comment
    replyToPost: indicates whether the comment is replying to a post/comment
    replyId: the id of the post/comment that this comment is replying to.
}
Output {
    the comment should be added into the comment collection
}

//TO DO: update repliedBy for the parent post/comment
*/

export const addComment = async (data: {
  author: string
  content: string
  replyToPost: boolean
  replyToProductSell: boolean
  replyToProductBuy: boolean
  replyId: string
}) => {
  const {
    author, content, replyToPost, replyToProductSell, replyToProductBuy, replyId,
  } = data;
  if (content === null) {
    return Promise.reject(new Error('Empty content, invalid field.'));
  }
  let replyAuthor:string = '';
  if (replyToPost === true) {
    const collection = 'post';
    const postRef = db.collection(collection).doc(replyId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    if (!postData) {
      return Promise.reject(new Error('post does not exist'));
    }
    replyAuthor = postData.userName;
  } else if (replyToProductSell === true) {
    const collection = 'productSell';
    const productRef = db.collection(collection).doc(replyId);
    const productDoc = await productRef.get();
    const productData = productDoc.data();
    if (!productData) {
      return Promise.reject(new Error('product does not exist'));
    }
    replyAuthor = productData.sellerName;
  } else if (replyToProductBuy === true) {
    const collection = 'productBuy';
    const productRef = db.collection(collection).doc(replyId);
    const productDoc = await productRef.get();
    const productData = productDoc.data();
    if (!productData) {
      return Promise.reject(new Error('product does not exist'));
    }
    replyAuthor = productData.buyerName;
  } else {
    const collection = 'comment';
    const comRef = db.collection(collection).doc(replyId);
    const comDoc = await comRef.get();
    const comData = comDoc.data();
    if (!comData) {
      return Promise.reject(new Error('comment does not exist'));
    }
    replyAuthor = comData.author;
  }
  const likedBy:Array<string> = []; // list of uids that liked this comment
  const repliedBy:Array<string> = []; // list of comments that replied to this comment
  const timePosted:number = Math.floor(Date.now() / 1000);
  const like:number = 0;
  const commentInfo = {
    author,
    content,
    likedBy,
    like,
    replyAuthor,
    repliedBy,
    replyId,
    replyToPost,
    timePosted,
  };
  const collection = 'comment';
  const commentRef = db.collection(collection);
  const docRef = await commentRef.add(commentInfo);
  if (!replyToPost && !replyToProductBuy && !replyToProductSell) {
    const updateInfo = {
      commentId: replyId,
      toAddId: docRef.id,
    };
    updateRepliedComment(updateInfo);
  } else if (replyToPost === true) {
    const updateInfo = {
      postId: replyId,
      toAddId: docRef.id,
    };
    updateRepliedPost(updateInfo);
  } else if (replyToProductBuy === true) {
    const updateInfo = {
      productId: replyId,
      toAddId: docRef.id,
    };
    updateRepliedProductBuy(updateInfo);
  } else {
    const updateInfo = {
      productId: replyId,
      toAddId: docRef.id,
    };
    updateRepliedProductSell(updateInfo);
  }
  return docRef.id;
};

export default functions.https.onCall(addComment);
