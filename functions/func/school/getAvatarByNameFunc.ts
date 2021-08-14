import * as functions from 'firebase-functions';
import { db, storage } from '../../db';

/*
Author @YH
Retrieve downloadable link for school avatar by name
Caution: No error checking!, WILL THROW ERRORs
Inputs {
    name: school's name
}
Output {
    a downloadable link or an error if school name DNE
}
 */

export const getAvatarByName = async (data:{
  name : string;
}) => {
  const schoolCollection = db.collection('school');
  const snapshot = await schoolCollection.where('schoolName', '==', data.name).get();
  const file = await storage.file(snapshot.docs[0].data().avatar);
  const expiration = new Date();
  expiration.setDate(expiration.getDate() + 7);
  const urls = await file.getSignedUrl({ action: 'read', expires: expiration });
  return urls[0];
};

export default functions.https.onCall(getAvatarByName);
