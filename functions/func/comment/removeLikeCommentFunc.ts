import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
remove 1 to like of a certain comment. reomove uid in LikeBy array of a certain comment
Input {
    uid: uid of the update user 
    commentId: the comment user want remove like to
}
Output {
    promise
}

*/
export const removeLikeComment = async (data:{
    uid: string;
    commentId: string;
}) => {
    const {uid, commentId} = data;
    const collection = 'comment';
    const comRef = db.collection(collection).doc(commentId);
    const comDoc = await comRef.get();
    const comData = comDoc.data();
    if (!comData) {
        return Promise.reject(new Error('commentData does not exist'));
    }
    const LikeArr = await comData.likedBy;
    var checkIn = false;
    for (var items of LikeArr) {
        if (uid === items) {
            checkIn = true;
        }
    }
    if (checkIn === false) {
        return Promise.resolve('uid has already been removed from Like Array');
    }
    return new Promise((resolve, reject) => {
        if (!comData) {
            reject(new Error('commentData does not exist'));
        } else {
          var newLike = comData.like;
          newLike -= 1;
          comRef.update({ like: newLike });
          const LikeArray = comData.likedBy;
          LikeArray.forEach((element:string, index:number) => {
            if (element === uid) LikeArray.splice(index, 1);
          });
          comRef.update({ likedBy: LikeArray });
          resolve(LikeArray);
        }
    });

}
export default functions.https.onCall(removeLikeComment);