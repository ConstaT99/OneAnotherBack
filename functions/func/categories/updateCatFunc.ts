import * as functions from 'firebase-functions';
import { db } from '../../db';
import { isCatExists } from './isCatExists';

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

export const updateCatFunc = async (data:{
  name: string,
  postId: string
}) => {
  const { name, postId } = data;
  if (!await isCatExists({ name })) {
    return Promise.reject(new Error('category does not exist'));
  }
  const lastUpdate = Math.floor(Date.now() / 1000);
  const collection = 'categories';
  const catRefid = db.collection(collection);
  const snapshot = await catRefid.where('catName', '==', name).get();
  const catId = snapshot.docs[0].id;

  const catRef = db.collection(collection).doc(catId);
  await catRef.update({ lastUpdate });

  const catDoc = await catRef.get();
  const catData = catDoc.data();
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
export default functions.https.onCall(updateCatFunc);
