/* eslint-disable */
import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author @Carstin
remove saved post from the user selected folders
input {
    uid: user Id
    folderName: the name of the folder user remove post from
    postId: post Id of the post user remove
}
*/
export const removeSavedPost = async (data:{
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
  let checkIn = false;
  const currentArray = saveData.savedPosts;
  for (const items of currentArray) {
    if (items === postId) {
      checkIn = true;
    }
  }
  if (checkIn === false) {
    return Promise.resolve('post have already been removed from folder');
  }
  await currentArray.forEach((element:string, index:number) => {
    if (element === postId) currentArray.splice(index, 1);
  });
  const folderId = snapshot.docs[0].id;
  const accurateSaveRef = db.collection('user').doc(uid).collection('savedPost').doc(folderId);
  await accurateSaveRef.update({ savedPosts: currentArray });
  return Promise.resolve('post has been removed from the savedArray');
};
export default functions.https.onCall(removeSavedPost);
