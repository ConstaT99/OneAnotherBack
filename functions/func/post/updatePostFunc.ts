import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
This is oncall function for update user profile written by Jerry;
input:
    data:{
      uid: string;
      postId: string;
      updateField: string;
      updateContext: any;
    }
output:
    promise<writeresult>
*/
export const updatePost = async (data: {
  uid: string;
  postId: string;
  updateField: string;
  updateContext: any;
}) => {
  const {
    uid, postId, updateField, updateContext,
  } = data;// get the value
  if (uid == null) {
    return Promise.reject(new Error('uid does not exist'));
  }
  if (updateField == null || updateContext == null) {
    return Promise.reject(new Error('update info is missing'));
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

  return postRef.update({ [updateField]: updateContext });
};

export default functions.https.onCall(updatePost);
