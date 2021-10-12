import * as functions from 'firebase-functions';
import { db } from '../../db';

/*
Author: @Carstin
Get saved posts within a specific folder
Input {
    uid: the user id of the current user
    folderName: the name of the folder you wanna find
}
Output {
    save folder Data
}
*/
export const getSavedPostsByFolder = async (data:{
  uid: string,
  folderName: string,
}) => {
  const { uid, folderName } = data;
  const saveRef = db.collection('user').doc(uid).collection('savedPost');
  const snapshot = await saveRef.where('folderName', '==', folderName).get();
  const saveData = snapshot.docs[0].data();
  if (!saveData) {
    return Promise.resolve('folder does not exists');
  }

  return saveData;
};
export default functions.https.onCall(getSavedPostsByFolder);
