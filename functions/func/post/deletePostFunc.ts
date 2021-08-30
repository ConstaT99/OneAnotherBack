import * as functions from 'firebase-functions';
import { db } from '../../db';

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
    1. finish delete the post from tag array
    2. finish delete the post from category array
    3. like array need fixed a
    4. add another number called viewed with length 30
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
  //   const postTag = postData.tag;
  // delete from the tag array
  // delete from the categories
  return postRef.delete();
};

export default functions.https.onCall(deletePost);
