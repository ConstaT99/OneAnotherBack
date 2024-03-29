import * as functions from 'firebase-functions';
import { db } from '../../db';

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

  // @ts-ignore
  if (catData.postArray.includes(postId) === false) {
    return Promise.reject(new Error('post does not exist in this tag'));
  }

  const lastUpdate = Math.floor(Date.now() / 1000);

  await catRef.update({ lastUpdate });

  const docIdArray = catData.postArray;
  docIdArray.forEach((element:string, index:number) => {
    if (element === postId) docIdArray.splice(index, 1);
  });
  await catRef.update({ postArray: docIdArray });
  return docIdArray;
};
export default functions.https.onCall(deletePostFromCat);
