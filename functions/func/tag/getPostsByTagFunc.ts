import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
return a PostArray which contains 10 hotest post under this TAG

*/
export const getPostsByTag = async (data:{
  prePostId: string,
  tagName: string,
}) => {
  const collection = 'tag';
  const { tagName, prePostId } = data;
  const catRef = db.collection(collection);
  const snapshot = await catRef.where('name', '==', tagName).get();
  const tagData = snapshot.docs[0].data();
  if (!tagData) {
    return Promise.reject(new Error('tag does not exist'));
  }
  if (tagData.posts.length === 0) {
    const outArray:string[] = [];
    return outArray;
  }

  if (prePostId === '') {
    const postRef = db.collection('post');
    const postGet = await postRef.where('tag', '==', tagName).where('privacy', '==', false).orderBy('postScore', 'desc').orderBy('postId').limit(10)
      .get();
    const postsData = await postGet.docs.map((doc) => doc.data());
    return postsData;
  }
  const prePostRef = db.collection('post').doc(prePostId);
  const prePostDoc = await prePostRef.get();
  const prePostData = prePostDoc.data();
  if (!prePostData) {
    return Promise.reject(new Error('postData could not be reached'));
  }
  const prePostScore = prePostData.postScore;
  const postRef = db.collection('post');
  const postGet = await postRef.where('tag', '==', tagName).where('privacy', '==', false).orderBy('postScore', 'desc')
    .orderBy('postId')
    .startAfter(prePostScore, prePostId)
    .limit(10)
    .get();
  const postsData = postGet.docs.map((doc) => doc.data());
  return postsData;
};
export default functions.https.onCall(getPostsByTag);
