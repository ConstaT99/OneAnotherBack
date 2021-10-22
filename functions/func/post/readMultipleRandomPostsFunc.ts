import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
read multiple random posts in this one func
Input {
  prePostId: the postId of the last post in previous call
    null for first time calling this func.
}
Output {
  postArray: limit 10 posts max for each call
}
*/
export const readMultipleRandomPosts = async (data:{
  prePostId: string;
}) => {
  const { prePostId } = data;
  var collection;
  var postRef;
  var postGet;
  var postsData;
  if (prePostId === '') {
    collection = 'post';
    postRef = db.collection(collection);
    postGet = await postRef.where('privacy', '==', false)
      .orderBy('createTime', 'desc')
      .orderBy('postId')
      .limit(10)
      .get();
    postsData = postGet.docs.map((doc) => doc.data());
    return postsData;
  }
  const prePostRef = db.collection('post').doc(prePostId);
  const prePostDoc = await prePostRef.get();
  const prePostData = prePostDoc.data();
  if (!prePostData) {
    return Promise.reject(new Error('postData could not be reached'));
  }
  const preCreatedTime = prePostData.createTime;
  collection = 'post';
  postRef = db.collection(collection);
  postGet = await postRef.where('privacy', '==', false)
    .orderBy('createTime', 'desc')
    .orderBy('postId')
    .startAfter(preCreatedTime, prePostId)
    .limit(10)
    .get();
  postsData = postGet.docs.map((doc) => doc.data());
  return postsData;
};

export default functions.https.onCall(readMultipleRandomPosts);
