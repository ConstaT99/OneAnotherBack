import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
read multiple hot posts in this one func
*/
export const readMultipleHotPosts = async (data:{
  prePostId : string;
}) => {
  const { prePostId } = data;
  if (prePostId === '') {
    const collection = 'post';
    const postRef = db.collection(collection);
    const postGet = await postRef.where('privacy', '==', false).orderBy('postScore', 'desc').orderBy('postId').limit(10).get();
    const postsData = postGet.docs.map((doc) => doc.data());
    return postsData;
  }
  const prePostRef = db.collection('post').doc(prePostId);
  const prePostDoc = await prePostRef.get();
  const prePostData = prePostDoc.data();
  if (!prePostData) {
    return Promise.reject(new Error('postData could not be reached'));
  }
  const prePostScore = prePostData.postScore;
  const collection = 'post';
  const postRef = db.collection(collection);
  const postGet = await postRef.where('privacy', '==', false).orderBy('postScore', 'desc').orderBy('postId')
    .startAfter(prePostScore, prePostId)
    .limit(10)
    .get();
  const postsData = postGet.docs.map((doc) => doc.data());
  return postsData;
};
export default functions.https.onCall(readMultipleHotPosts);
