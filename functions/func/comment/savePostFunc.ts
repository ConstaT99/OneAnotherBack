/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
save the post to the user selected folders
input {
    uid: user Id
    folderName: the name of the folder user saved post to
    postId: post Id of the post user saved
}
Output {
  promise
}
*/
export const savePost = async (data:{
  uid: string;
  folderName: string;
  postId: string;
}) => {
  const { uid, folderName, postId } = data;
  const saveRef = db.collection('user').doc(uid).collection('savedPost');
  const snapshot = await saveRef.where('folderName', '==', folderName).get();
  const saveData = snapshot.docs[0].data();
  if (!saveData) {
    return Promise.resolve('folder does not exists');
  }
  const currentArray = saveData.savedPosts;
  for (const items of currentArray) {
    const temp1:string = items;
    if (temp1 === postId) {
      return Promise.resolve('post had already been saved');
    }
  }
  await currentArray.push(postId);
  const folderId = snapshot.docs[0].id;
  const accurateSaveRef = db.collection('user').doc(uid).collection('savedPost').doc(folderId);
  accurateSaveRef.update({ savedPosts: currentArray });
  return Promise.resolve('post has been added to the savedArray');
};

export default functions.https.onCall(savePost);
