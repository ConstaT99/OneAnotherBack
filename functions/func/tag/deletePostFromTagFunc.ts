import * as functions from 'firebase-functions';
import { db } from '../../db';
import { isTagExists } from './isTagExists';

/*
Author @Carstin
Delete a specific post under a tag
Input{
    name: the name of the tag
    postId: The postId you wanna delete
}
Output{
    Input tag name does not exists => reject('tag does not exist')
    Input postId does not exists in this tag's postArray => reject('post does not exist in this tag')
    post successfully deleted => resolve(docIdArray);
}
*/

export const deletePostFromTagFunc = async (data:{
  name: string,
  postId: string
}) => {
  const { name, postId } = data;
  const checkId = await isTagExists({ name });
  if (checkId === null) {
    return Promise.reject(new Error('tag does not exist'));
  }
  const collection = 'tag';
  // @ts-ignore
  const tagRef = db.collection(collection).doc(checkId);
  const tagDoc = await tagRef.get();
  const tagData = tagDoc.data();
  // @ts-ignore
  if (tagData.posts.includes(postId) === false) {
    return Promise.reject(new Error('post does not exist in this tag'));
  }

  const lastUpdate = Math.floor(Date.now() / 1000);

  await tagRef.update({ lastUpdate });

  return new Promise((resolve, reject) => {
    if (!tagData) {
      reject(new Error('tagData Read failed'));
    } else {
      const docIdArray = tagData.posts;
      docIdArray.forEach((element:string, index:number) => {
        if (element === postId) docIdArray.splice(index, 1);
      });
      tagRef.update({ posts: docIdArray });
      resolve(docIdArray);
    }
  });
};
export default functions.https.onCall(deletePostFromTagFunc);
