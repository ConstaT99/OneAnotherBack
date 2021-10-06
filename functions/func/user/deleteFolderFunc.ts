import * as functions from 'firebase-functions';
import { db } from '../../db';

export const deleteFolder = async (data:{
  uid: string;
  folderName: string;
}) => {
  const { uid, folderName } = data;

  const userRef = db.collection('user').doc(uid);
  const userDoc = await userRef.get();
  const userData = userDoc.data();
  if (!userData) {
    return Promise.reject(new Error('userData could not be fetched'));
  }
  const saveArray = userData.savedPost;
  let checkIn = false;
  for (const items of saveArray) {
    if (items === folderName) {
      checkIn = true;
    }
  }
  if (checkIn === false) {
    return Promise.resolve('folder already deleted');
  }
  await saveArray.forEach((element:string, index:number) => {
    if (element === folderName) saveArray.splice(index, 1);
  });
  await userRef.update({ savedPost: saveArray });
  const saveRef = userRef.collection('savedPost');
  const snapshot = await saveRef.get();
  const saveid = snapshot.docs[0].id;

  const folderRef = db.collection('user').doc(uid).collection('savedPost').doc(saveid);
  folderRef.delete();
  return Promise.resolve('folder has been successfully deleted');
};

export default functions.https.onCall(deleteFolder);
