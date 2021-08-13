import * as functions from 'firebase-functions';
import { db, storage } from '../../db';

/*
Author @YH
Retrieve downloadable link for school avatar by name
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
  schoolCollection.where('schoolName', '==', data.name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const file = storage.file(doc.data().avatar);
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 7);
        file.getSignedUrl({ action: 'read', expires: expiration }).then((urls) => {
          console.log(urls[0]);
          return urls[0];
        });
      });
    })
    .catch((error) => error);
};

export default functions.https.onCall(getAvatarByName);
