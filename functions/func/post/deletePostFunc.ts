import * as functions from 'firebase-functions';
import { db } from '../../db';
import { deletePostFromCatFunc } from '../categories/deletePostFromCatFunc';
import { deletePostFromTagFunc } from '../tag/deletePostFromTagFunc';

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
    4. add another number called viewed with length 30
*/
export const deletePostFunc = async (data:{
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

  await deletePostFromTagFunc(deleteTagData);

  // delete from the categories
  const postCat = postData.categories;
  const deleteCatData = {
    name: postCat,
    postId,
  };
  await deletePostFromCatFunc(deleteCatData);

  return postRef.delete();
};

export default functions.https.onCall(deletePostFunc);
