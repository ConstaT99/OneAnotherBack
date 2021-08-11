import * as functions from 'firebase-functions';
import firebase from 'firebase';
import { db } from '../../db';

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
  const schoolCollection = db.collection('School');
  schoolCollection.where('schoolName', '==', data.name)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => firebase.storage()
        .refFromURL(doc.get('avatar')).getDownloadURL());
    })
    .catch((error) => error);
};

export default functions.https.onCall(getAvatarByName);
