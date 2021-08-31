import * as functions from 'firebase-functions';
import { db } from '../../db';
import { isCatExists } from './isCatExists';

/*
Author @Carstin
Delete a specific post under a cat
Input{
    name: the name of the cat
    postId: The postId you wanna delete
}
Output{
    Input cat name does not exists => reject('category does not exist')
    Input postId does not exists in this cat's postArray => reject('post does not exist in this tag')
    post successfully deleted => resolve(docIdArray);
}
*/

export const deletePostFromCat = async (data:{
  name: string,
  postId: string
}) => {
  const { name, postId } = data;
  if (!await isCatExists({ name })) {
    return Promise.reject(new Error('category does not exist'));
  }
  const collection = 'categories';
  const catRefid = db.collection(collection);
  const snapshot = await catRefid.where('catName', '==', name).get();
  const catId = snapshot.docs[0].id;

  // @ts-ignore
  const catRef = db.collection(collection).doc(catId);
  const catDoc = await catRef.get();
  const catData = catDoc.data();
  // @ts-ignore
  if (catData.postArray.includes(postId) === false) {
    return Promise.reject(new Error('post does not exist in this tag'));
  }

  const lastUpdate = Math.floor(Date.now() / 1000);

  await catRef.update({ lastUpdate });

  return new Promise((resolve, reject) => {
    if (!catData) {
      reject(new Error('catData Read failed'));
    } else {
      const docIdArray = catData.postArray;
      docIdArray.forEach((element:string, index:number) => {
        if (element === postId) docIdArray.splice(index, 1);
      });
      catRef.update({ postArray: docIdArray });
      resolve(docIdArray);
    }
  });
};
export default functions.https.onCall(deletePostFromCat);
