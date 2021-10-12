/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
add 1 to like of a certain comment. Add uid to LikeBy array of a certain comment
Input {
    uid: uid of the update user
    commentId: the comment user want add like to
}
Output {
    promise
}

*/
export const addLikeComment = async (data:{
  uid: string;
  commentId: string;
}) => {
  const { uid, commentId } = data;
  const collection = 'comment';
  const comRef = db.collection(collection).doc(commentId);
  const comDoc = await comRef.get();
  const comData = comDoc.data();
  if (!comData) {
    return Promise.reject(new Error('commentData does not exist'));
  }
  const LikeArr = await comData.likedBy;
  for (const items of LikeArr) {
    if (uid === items) {
      return Promise.resolve('uid already existed in the like array');
    }
  }

  return new Promise((resolve, reject) => {
    if (!comData) {
      reject(new Error('commentData does not exist'));
    } else {
      let newLike = comData.like;
      newLike += 1;
      comRef.update({ like: newLike });
      const LikeArray = comData.likedBy;
      const newDocId = LikeArray.push(uid);
      comRef.update({ likedBy: LikeArray });
      resolve(newDocId);
    }
  });
};
export default functions.https.onCall(addLikeComment);
