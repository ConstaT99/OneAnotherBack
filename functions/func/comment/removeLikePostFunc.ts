/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
remove 1 to like of a certain post. reomove uid in LikeBy array of a certain post
Input {
    uid: uid of the update user
    postId: the post user want remove like to
}
Output {
    promise
}

*/
export const removeLikePost = async (data:{
  uid: string;
  postId: string;
}) => {
  const { uid, postId } = data;
  const collection = 'post';
  const postRef = db.collection(collection).doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();
  if (!postData) {
    return Promise.reject(new Error('commentData does not exist'));
  }
  const LikeArr = await postData.likeBy;
  let checkIn = false;
  for (const items of LikeArr) {
    const temp:string = items;
    if (uid === temp) {
      checkIn = true;
    }
  }
  if (checkIn === false) {
    return Promise.resolve('uid has already been removed from Like Array');
  }
  return new Promise((resolve, reject) => {
    if (!postData) {
      reject(new Error('postData does not exist'));
    } else {
      let newLike = postData.like;
      newLike -= 1;
      postRef.update({ like: newLike });
      const LikeArray = postData.likeBy;
      LikeArray.forEach((element:string, index:number) => {
        if (element === uid) LikeArray.splice(index, 1);
      });
      postRef.update({ likeBy: LikeArray });
      resolve(LikeArray);
    }
  });
};
export default functions.https.onCall(removeLikePost);
