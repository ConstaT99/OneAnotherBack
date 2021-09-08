import * as functions from 'firebase-functions';
import { db } from '../../db';
import { deletePostFromCat } from '../categories/deletePostFromCatFunc';
import { deletePostFromTag } from '../tag/deletePostFromTagFunc';

/*
This is oncall  function for delete post written by Jerry;
input:
    data:{
      uid: string
      postId: string;
    }
output:
    promise<writeresult | Error >

    TODO:
    delete comments and all replies
*/
export const deletePost = async (data:{
  uid: string;
  postId: string;
}) => {
  const { uid, postId } = data;
  if (uid == null) {
    return Promise.reject(new Error('uid does not provide'));
  }
  if (postId == null) {
    return Promise.reject(new Error('postId does not provide'));
  }
  const collection = 'post';
  const postRef = db.collection(collection).doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();
  if (postData === undefined) {
    return Promise.reject(new Error('postData does not exist'));
  }
  const postUid = postData.uid;
  if (postUid !== uid) {
    return Promise.reject(new Error('you do not have premission to delete this post'));
  }

  // delete tage from tag
  const postTag = postData.tag;
  const deleteTagData = {
    name: postTag,
    postId,
  };

  await deletePostFromTag(deleteTagData);

  // delete from the categories
  const postCat = postData.categories;
  const catRefid = db.collection('categories');
  const snapshot = await catRefid.where('catName', '==', postCat).get();
  const catId = snapshot.docs[0].id;
  const deleteCatData = {
    catId,
    postId,
  };
  await deletePostFromCat(deleteCatData);

  // TODO!! delete comment and replies

  return postRef.delete();
};

export default functions.https.onCall(deletePost);
