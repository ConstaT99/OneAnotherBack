import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
add a specific post into a cat's postArray
Input{
    name: the name of the cat
    postId: The postId you wanna add
}
Output{
    Input cat name does not exists => reject('category does not exist')
    post successfully added => esolve(newDocId);
}
*/

export const updateCat = async (data:{
  catId: string,
  postId: string
}) => {
  const { catId, postId } = data;
  const collection = 'categories';
  const catRef = db.collection(collection).doc(catId);
  const catDoc = await catRef.get();
  const catData = catDoc.data();

  if (!catData) {
    return Promise.reject(new Error('category does not exist'));
  }

  const lastUpdate = Math.floor(Date.now() / 1000);

  await catRef.update({ lastUpdate });

  return new Promise((resolve, reject) => {
    if (!catData) {
      reject(new Error('catData Read failed'));
    } else {
      const docIdArray = catData.postArray;
      const newDocId = docIdArray.push(postId);
      catRef.update({ postArray: docIdArray });
      resolve(newDocId);
    }
  });
};
export default functions.https.onCall(updateCat);
