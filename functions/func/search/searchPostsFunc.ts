import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author: @Carstin
Search matched name posts
Input {
    input: the user input
    prePostId: the postId of the last post in previous call
    empty for first time calling this func.
    title: search title (true) search content (false)
}
Output {
    postData array
}
*/

export const searchPosts = async (data:{
  input: string;
  prePostId: string;
  title: boolean;
}) => {
  const { input, prePostId, title } = data;
  const collection = 'post';
  const postRef = db.collection(collection);
  let postGet;
  if (prePostId === '') {
    if (title === true) {
      postGet = await postRef.where('privacy', '==', false)
        .where('title', '>=', input)
        .where('title', '<=', `${input}\uf8ff`)
        .limit(10)
        .get();
      const postsData = postGet.docs.map((doc) => doc.data());
      return postsData;
    }
    postGet = await postRef.where('privacy', '==', false)
      .where('content', '>=', input)
      .where('content', '<=', `${input}\uf8ff`)
      .limit(10)
      .get();
    const postsData = postGet.docs.map((doc) => doc.data());
    return postsData;
  }
  const prePostRef = db.collection(collection).doc(prePostId);
  const prePostDoc = await prePostRef.get();
  const prePostData = prePostDoc.data();
  if (!prePostData) {
    return Promise.reject(new Error('postData could not be reached'));
  }
  if (title === true) {
    postGet = await postRef.where('privacy', '==', false)
      .where('title', '>=', input)
      .where('title', '<=', `${input}\uf8ff`)
      .startAfter(prePostDoc)
      .limit(10)
      .get();
    const postsData = postGet.docs.map((doc) => doc.data());
    return postsData;
  }
  postGet = await postRef.where('privacy', '==', false)
    .where('content', '>=', input)
    .where('content', '<=', `${input}\uf8ff`)
    .startAfter(prePostDoc)
    .limit(10)
    .get();
  const postsData = postGet.docs.map((doc) => doc.data());
  return postsData;
};
export default functions.https.onCall(searchPosts);
