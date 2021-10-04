import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
add 1 to like of a certain post. Add uid to LikeBy array of a certain post
Input {
    uid: uid of the update user 
    postId: the post user want add like to
}
Output {
    promise
}

*/
export const addLikePost = async (data:{
    uid: string;
    postId: string;
}) => {
    const {uid, postId} = data;
    const collection = 'post';
    const postRef = db.collection(collection).doc(postId);
    const postDoc = await postRef.get();
    const postData = postDoc.data();
    if (!postData) {
        return Promise.reject(new Error('postData does not exist'));
    }
    const LikeArr = await postData.likeBy;
    for (var items of LikeArr) {
        if (uid === items) {
            return Promise.resolve('uid already existed in the like array');
        }
    }
    const lastUpdate = Math.floor(Date.now() / 1000);

    return new Promise((resolve, reject) => {
        if (!postData) {
            reject(new Error('postData does not exist'));
        } else {
          var newLike = postData.like;
          newLike += 1;
          postRef.update({ like: newLike });
          postRef.update({ editTime: lastUpdate });
          const LikeArray = postData.likeBy;
          const newDocId = LikeArray.push(uid);
          postRef.update({ likeBy: LikeArray });
          resolve(newDocId);
        }
    });

}
export default functions.https.onCall(addLikePost);