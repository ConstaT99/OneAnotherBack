import * as functions from 'firebase-functions';
import { db } from '../../db';
/*
Author @Carstin
Help func for tag. It will get the first pic of the post which linked by this postId.
Input {
    postId: the postId of the post you wanna find pic from
}
Output {
    reject if the reading proccess has failed

    url : the url of the first pic in this post
}
*/

export const getPicOfPost = async (data:{
  postId: string
}) => {
  const { postId } = data;
  const postRef = db.collection('post').doc(postId);
  const postDoc = await postRef.get();
  const postData = postDoc.data();

  return new Promise((resolve, reject) => {
    if (!postData) {
      reject(new Error(`postData Read failed: at collection post with docID [${postId}].`));
    } else {
      const pic = 'picture' ? postData.picture : postData;
      const url = pic[0];
      resolve(url);
    }
  });
};

export default functions.https.onCall(getPicOfPost);
